import { useState, useEffect, useRef } from 'react';
import { TrendingDown, Zap, Clock, FastForward } from 'lucide-react';

const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

function formatPesos(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(3)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function formatElapsed(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
  if (m > 0) return `${m}m ${s.toString().padStart(2,'0')}s`;
  return `${s}s`;
}

// 1 segundo real = 1 hora simulada → el contador acelerado avanza 3600× más rápido
const FAST_FACTOR = 3600;

export default function LossCounter({ salarioBruto, inflacionAnual, categoriaLabel }) {
  const [elapsed, setElapsed]   = useState(0);   // segundos reales transcurridos
  const [isActive, setIsActive] = useState(true);
  const startRef = useRef(Date.now());
  const pausedAt = useRef(null);

  const lossPerSecond = (salarioBruto * (inflacionAnual / 100)) / SECONDS_PER_YEAR;
  const lossPerHour   = lossPerSecond * 3600;
  const lossPerMonth  = lossPerSecond * (SECONDS_PER_YEAR / 12);

  // Pérdida acumulada real
  const totalLostReal = lossPerSecond * elapsed;
  // Pérdida acumulada simulada (1s real = 1h)
  const totalLostFast = lossPerHour * elapsed;

  useEffect(() => {
    startRef.current = Date.now();
    pausedAt.current = null;
    setElapsed(0);
  }, [salarioBruto, inflacionAnual]);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000);
    }, 50);
    return () => clearInterval(id);
  }, [isActive]);

  function togglePause() {
    if (isActive) {
      pausedAt.current = elapsed;
    } else {
      startRef.current = Date.now() - pausedAt.current * 1000;
    }
    setIsActive(a => !a);
  }

  const severity = inflacionAnual > 100 ? 'red' :
                   inflacionAnual > 50  ? 'orange' :
                   inflacionAnual > 25  ? 'amber' : 'yellow';

  const colorMap = {
    red:    { bg: 'bg-red-950/80',    border: 'border-red-700/60',    text: 'text-red-300',    num: 'text-red-400',    badge: 'bg-red-900/60',    fastBg: 'bg-red-900/40',    fastBorder: 'border-red-600/50',    fastNum: 'text-red-200' },
    orange: { bg: 'bg-orange-950/80', border: 'border-orange-700/60', text: 'text-orange-300', num: 'text-orange-400', badge: 'bg-orange-900/60', fastBg: 'bg-orange-900/40', fastBorder: 'border-orange-600/50', fastNum: 'text-orange-200' },
    amber:  { bg: 'bg-amber-950/80',  border: 'border-amber-700/60',  text: 'text-amber-300',  num: 'text-amber-400',  badge: 'bg-amber-900/60',  fastBg: 'bg-amber-900/40',  fastBorder: 'border-amber-600/50',  fastNum: 'text-amber-200' },
    yellow: { bg: 'bg-yellow-950/80', border: 'border-yellow-700/60', text: 'text-yellow-300', num: 'text-yellow-400', badge: 'bg-yellow-900/60', fastBg: 'bg-yellow-900/40', fastBorder: 'border-yellow-600/50', fastNum: 'text-yellow-200' },
  };
  const c = colorMap[severity];

  // Tiempo simulado = elapsed * FAST_FACTOR segundos → mostrar como días/horas
  const simSecs = elapsed * FAST_FACTOR;
  const simDays = Math.floor(simSecs / 86400);
  const simHours = Math.floor((simSecs % 86400) / 3600);
  const simLabel = simDays > 0
    ? `${simDays}d ${simHours}h simulados`
    : `${Math.floor(simSecs / 3600)}h simuladas`;

  return (
    <div className={`rounded-xl border ${c.bg} ${c.border} overflow-hidden`}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${c.badge}`}>
            <TrendingDown className={`w-4 h-4 ${c.text}`} />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Pérdida de poder adquisitivo</p>
            <p className={`text-xs ${c.text} opacity-75`}>{categoriaLabel}</p>
          </div>
        </div>
        <button
          onClick={togglePause}
          className={`text-xs px-2.5 py-1 rounded-lg border ${c.border} ${c.text} hover:opacity-80 transition-opacity`}
        >
          {isActive ? 'Pausar' : 'Reanudar'}
        </button>
      </div>

      {/* Dos contadores en paralelo */}
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">

        {/* Contador real */}
        <div className={`rounded-xl border ${c.border} bg-black/20 px-3 py-2.5`}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Clock className={`w-3.5 h-3.5 ${c.text}`} />
            <span className="text-xs text-slate-400 font-medium">Tiempo real</span>
          </div>
          <p className="text-xs text-slate-500 mb-1">{formatElapsed(elapsed)}</p>
          <div className={`font-mono font-bold text-xl ${c.num} leading-none tracking-tight`}>
            −{formatPesos(totalLostReal)}
          </div>
          <p className="text-xs text-slate-500 mt-1">{formatPesos(lossPerSecond)}/seg</p>
        </div>

        {/* Contador acelerado */}
        <div className={`rounded-xl border ${c.fastBorder} ${c.fastBg} px-3 py-2.5 relative overflow-hidden`}>
          {/* Pulso de fondo */}
          {isActive && (
            <span className={`absolute inset-0 rounded-xl animate-ping opacity-10 ${c.fastBg}`} />
          )}
          <div className="flex items-center gap-1.5 mb-1.5 relative">
            <FastForward className={`w-3.5 h-3.5 ${c.fastNum}`} />
            <span className="text-xs text-slate-300 font-semibold">1 seg = 1 hora</span>
          </div>
          <p className="text-xs text-slate-400 mb-1 relative">{simLabel}</p>
          <div className={`font-mono font-black text-xl ${c.fastNum} leading-none tracking-tight relative`}>
            −{formatPesos(totalLostFast)}
          </div>
          <p className="text-xs text-slate-400 mt-1 relative">{formatPesos(lossPerHour)}/hora</p>
        </div>
      </div>

      {/* Tasas de referencia */}
      <div className={`grid grid-cols-3 gap-px bg-slate-700/30 border-t ${c.border}`}>
        {[
          { label: 'por segundo', value: lossPerSecond },
          { label: 'por hora',    value: lossPerHour },
          { label: 'por mes',     value: lossPerMonth },
        ].map(({ label, value }) => (
          <div key={label} className={`${c.bg} px-2 py-2.5 text-center`}>
            <p className={`font-semibold text-sm ${c.text}`}>{formatPesos(value)}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Contexto */}
      <div className={`px-3 py-2 border-t ${c.border} flex items-start gap-2`}>
        <Zap className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c.text}`} />
        <p className="text-xs text-slate-400 leading-relaxed">
          Inflación anual: <span className={`font-semibold ${c.text}`}>{inflacionAnual}%</span>.
          Pérdida anual: <span className={`font-semibold ${c.text}`}>{formatPesos(salarioBruto * inflacionAnual / 100)}</span> de poder de compra.
        </p>
      </div>
    </div>
  );
}
