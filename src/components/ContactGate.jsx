import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwjgqW_3J1t2XS0sFFhwOpE0PBTKWVG2FbfA7LktxGaxHx_IsrrN1PWHGs2DVrVTeFF/exec';

const ROLES = [
  'Docente Universitario',
  'Docente Preuniversitario',
  'No Docente',
  'Otro',
];

export default function ContactGate({ onAccess }) {
  const [email,    setEmail   ] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol,      setRol     ] = useState('');
  const [status,   setStatus  ] = useState('idle'); // idle | loading | error

  const canSubmit = (email.trim() !== '' || telefono.trim() !== '') && rol !== '';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('loading');
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ email, telefono, sector: rol }),
      });
    } catch {
      // Si falla el envío igual dejamos pasar — no bloqueamos por error de red
    }
    localStorage.setItem('contacto_registrado', '1');
    onAccess();
  }

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center px-6 z-50">

      {/* Logo + título */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <img
          src="/salario-docente/fadiunc.png"
          alt="FADIUNC"
          className="w-20 h-20 rounded-2xl object-contain bg-white/10 p-2 shadow-xl"
        />
        <div className="text-center">
          <h1 className="text-xl font-bold text-white leading-tight">
            Salario Docente Universitario
          </h1>
          <p className="text-blue-300 text-sm mt-1">FADIUNC · UNCuyo · 1996–2026</p>
        </div>
      </div>

      {/* Tarjeta */}
      <div className="w-full max-w-sm bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Dejá tu contacto para recibir novedades sobre paritarias y actualizaciones.
          <span className="block text-slate-500 text-xs mt-1">
            Email o teléfono + tipo de cargo requeridos.
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">
              Teléfono <span className="text-slate-600 font-normal">(opcional)</span>
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              placeholder="+54 9 261 000-0000"
              autoComplete="tel"
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">
              Soy <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRol(r)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                    rol === r
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              Error al conectar. Intentá de nuevo.
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || status === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          >
            {status === 'loading'
              ? 'Registrando...'
              : <><Send className="w-4 h-4" /> Acceder a la app</>}
          </button>
        </form>
      </div>

      <p className="text-xs text-slate-600 mt-6 text-center max-w-xs">
        Tus datos son usados exclusivamente para enviarte información sindical.
        No se comparten con terceros.
      </p>
    </div>
  );
}
