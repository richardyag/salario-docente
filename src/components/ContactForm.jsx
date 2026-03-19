import { useState } from 'react';
import { Bell, Send, Check, AlertCircle } from 'lucide-react';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwjgqW_3J1t2XS0sFFhwOpE0PBTKWVG2FbfA7LktxGaxHx_IsrrN1PWHGs2DVrVTeFF/exec';

export default function ContactForm({ sector }) {
  const [email,    setEmail   ] = useState('');
  const [telefono, setTelefono] = useState('');
  const [status,   setStatus  ] = useState('idle'); // idle | loading | ok | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email && !telefono) return;
    setStatus('loading');
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ email, telefono, sector }),
      });
      setStatus('ok');
      setEmail('');
      setTelefono('');
    } catch {
      setStatus('error');
    }
  }

  const sectorLabel = sector === 'universitarios'
    ? 'Docente Universitario'
    : sector === 'preuniversitarios'
    ? 'Docente Preuniversitario'
    : 'No Docente';

  if (status === 'ok') {
    return (
      <div className="rounded-xl border border-emerald-700/50 bg-emerald-950/40 px-4 py-5 flex items-center gap-3">
        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">¡Datos registrados!</p>
          <p className="text-xs text-emerald-400/70 mt-0.5">Te enviaremos novedades sobre paritarias y salarios.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden">
      <div className="px-3 pt-3 pb-2 border-b border-slate-700/40 flex items-center gap-2">
        <Bell className="w-4 h-4 text-teal-400" />
        <span className="text-sm font-semibold text-white">Recibir novedades</span>
      </div>

      <form onSubmit={handleSubmit} className="px-3 py-3 space-y-2.5">
        <p className="text-xs text-slate-400">
          Dejá tu contacto y te avisamos cuando haya novedades paritarias o actualizaciones de la app.
        </p>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Teléfono <span className="text-slate-600">(opcional)</span></label>
          <input
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            placeholder="+54 9 261 000-0000"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 placeholder:text-slate-600"
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            Error al enviar. Intentá de nuevo.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || (!email && !telefono)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-600 active:bg-teal-800 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading'
            ? <span className="text-xs">Enviando...</span>
            : <><Send className="w-3.5 h-3.5" /> Suscribirme</>}
        </button>

        <p className="text-xs text-slate-600 text-center">
          {sectorLabel} · FADIUNC / UNCuyo
        </p>
      </form>
    </div>
  );
}
