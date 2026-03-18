import { useState, useEffect, useRef } from 'react';
import { TrendingDown, Zap } from 'lucide-react';

const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

function formatPesos(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(3)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export default function LossCounter({ salarioBruto, inflacionAnual, categoriaLabel }) {
  const [elapsed, setElapsed]     = useState(0);   // segundos desde que se montó
  const [isActive, setIsActive]   = useState(true);
  const startRef = useRef(Date.now());

  // Pérdida por segundo = salario × tasa_inflación_anual / segundos_por_año
  const lossPerSecond = (salarioBruto * (inflacionAnual / 100)) / SECONDS_PER_YEAR;

  // También: pérdida por hora, día, mes
  const lossPerHour  = lossPerSecond * 3600;
  const lossPerDay   = lossPerSecond * 86400;
  const lossPerMonth = lossPerSecond * (SECONDS_PER_YEAR / 12);

  useEffect(() => {
    startRef.current = Date.now();
    setElapsed(0);
  }, [salarioBruto, inflacionAnual]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000);
    }, 100); // actualizar cada 100ms para suavidad
    return () => clearInterval(interval);
  }, [isActive]);

  const totalLost = lossPerSecond * elapsed;

  // Color según gravedad de inflación
  const severity = inflacionAnual > 100 ? 'red' :
                   inflacionAnual > 50  ? 'orange' :
                   inflacionAnual > 25  ? 'amber' : 'yellow';

  const colorMap = {
    red:    { bg: 'bg-red-950/80',    border: 'border-red-700/60',    text: 'text-red-300',    counter: 'text-red-400',    badge: 'bg-red-900/60' },
    orange: { bg: 'bg-orange-950/80', border: 'border-orange-700/60', text: 'text-orange-300', counter: 'text-orange-400', badge: 'bg-orange-900/60' },
    amber:  { bg: 'bg-amber-950/80',  border: 'border-amber-700/60',  text: 'text-amber-300',  counter: 'text-amber-400',  badge: 'bg-amber-900/60' },
    yellow: { bg: 'bg-yellow-950/80', border: 'border-yellow-700/60', text: 'text-yellow-300', counter: 'text-yellow-400', badge: 'bg-yellow-900/60' },
  };
  const c = colorMap[severity];

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
          onClick={() => {
            setIsActive(a => !a);
            if (!isActive) { startRef.current = Date.now() - elapsed * 1000; }
          }}
          className={`text-xs px-2.5 py-1 rounded-lg border ${c.border} ${c.text} hover:opacity-80 transition-opacity`}
        >
          {isActive ? 'Pausar' : 'Reanudar'}
        </button>
      </div>

      {/* Contador principal — acumulado desde que abriste la app */}
      <div className="px-3 pb-3">
        <p className="text-xs text-slate-500 mb-1">
          Desde que abriste esta pantalla ({Math.floor(elapsed)}s)
        </p>
        <div className={`font-mono font-bold text-3xl ${c.counter} leading-none tracking-tight`}>
          − {formatPesos(totalLost)}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          de poder de compra real
        </p>
      </div>

      {/* Tasas */}
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
          Inflación anual actual: <span className={`font-semibold ${c.text}`}>{inflacionAnual}%</span>.
          El salario pierde ese porcentaje de su valor cada año.
          En un año completo: <span className={`font-semibold ${c.text}`}>{formatPesos(salarioBruto * inflacionAnual / 100)}</span> de poder de compra.
        </p>
      </div>
    </div>
  );
}
