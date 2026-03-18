import { useState } from 'react';
import { CalendarRange, Sliders, TrendingDown, TrendingUp, X } from 'lucide-react';

const PRESETS = [
  { label: '5 años',  value: 5 },
  { label: '10 años', value: 10 },
  { label: '15 años', value: 15 },
  { label: '20 años', value: 20 },
  { label: 'Todo',    value: null },
];

function fmt1(n) { return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`; }
function fmt0(n) { return `${n > 0 ? '+' : ''}${Math.round(n)}%`; }

export default function PeriodSelector({ years, startYear, endYear, onChangeStart, onChangeEnd, cumulativeResult }) {
  const [custom,       setCustom      ] = useState(false);
  const [tooltipOpen,  setTooltipOpen ] = useState(false);

  const maxYear = years[years.length - 1];
  const minYear = years[0];

  // Detecta qué preset está activo
  const activePreset = !custom
    ? PRESETS.find(p =>
        p.value === null
          ? startYear === minYear
          : endYear - startYear === p.value
      )?.value ?? 'custom'
    : 'custom';

  function applyPreset(preset) {
    setCustom(false);
    if (preset === null) {
      onChangeStart(minYear);
      onChangeEnd(maxYear);
    } else {
      onChangeStart(Math.max(minYear, maxYear - preset));
      onChangeEnd(maxYear);
    }
  }

  const cr = cumulativeResult;
  const ganó = cr && cr.realGain >= 0;

  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 space-y-3">
      {/* Título + badge de resultado */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <CalendarRange className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-white truncate">
            Período: {startYear} → {endYear}
            <span className="ml-2 text-xs text-slate-400 font-normal">
              ({endYear - startYear} años)
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Badge resultado acumulado — toca para ver detalle */}
          {cr && (
            <button
              onClick={() => setTooltipOpen(o => !o)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                ganó
                  ? 'bg-emerald-900/70 border-emerald-600/50 text-emerald-300 hover:bg-emerald-800/70'
                  : 'bg-red-900/70 border-red-600/50 text-red-300 hover:bg-red-800/70'
              }`}
            >
              {ganó
                ? <TrendingUp  className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />}
              {fmt1(cr.realGain)}
            </button>
          )}

          <button
            onClick={() => setCustom(c => !c)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-colors ${
              custom
                ? 'bg-blue-800/60 border-blue-600/50 text-blue-300'
                : 'bg-slate-700/40 border-slate-600/40 text-slate-400'
            }`}
          >
            <Sliders className="w-3 h-3" />
            Custom
          </button>
        </div>
      </div>

      {/* Popover con detalle de pérdida/ganancia acumulada */}
      {tooltipOpen && cr && (
        <div className={`rounded-xl border p-3 space-y-2 ${
          ganó
            ? 'bg-emerald-950/80 border-emerald-700/50'
            : 'bg-red-950/80 border-red-700/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">
              {ganó ? '▲ Ganancia real acumulada' : '▼ Pérdida real acumulada'}
            </span>
            <button onClick={() => setTooltipOpen(false)}>
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
            </button>
          </div>

          {/* Dos métricas de pérdida */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`text-center py-2 rounded-lg ${ganó ? 'bg-emerald-900/40' : 'bg-red-900/40'}`}>
              <span className={`text-3xl font-black tabular-nums ${ganó ? 'text-emerald-300' : 'text-red-300'}`}>
                {fmt1(cr.realGain)}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">pérdida de poder adquisitivo</p>
            </div>
            {!ganó && cr.incInflacion > cr.incNominal && (
              <div className="text-center py-2 rounded-lg bg-red-900/40">
                <span className="text-3xl font-black tabular-nums text-red-300">
                  +{((( cr.incInflacion - cr.incNominal) / Math.abs(cr.incNominal)) * 100).toFixed(1)}%
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">la inflación superó al salario en</p>
              </div>
            )}
          </div>

          {/* Desglose */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Incremento salarial nominal</span>
              <span className="text-blue-300 font-semibold">{fmt0(cr.incNominal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Inflación acumulada</span>
              <span className="text-orange-400 font-semibold">{fmt0(cr.incInflacion)}</span>
            </div>
            <div className={`flex justify-between font-bold pt-1 border-t ${ganó ? 'border-emerald-800/50' : 'border-red-800/50'}`}>
              <span className="text-white">Resultado real</span>
              <span className={ganó ? 'text-emerald-300' : 'text-red-300'}>{fmt1(cr.realGain)}</span>
            </div>
            {cr.brechaPesos !== 0 && (
              <div className="flex justify-between text-xs pt-0.5">
                <span className="text-slate-500">
                  {cr.brechaPesos < 0 ? 'Faltan por mes' : 'Exceso vs inflación'}
                </span>
                <span className={`font-semibold ${cr.brechaPesos < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {cr.brechaPesos < 0 ? '-' : '+'}
                  {Math.abs(cr.brechaPesos) >= 1_000_000
                    ? `$${(Math.abs(cr.brechaPesos)/1_000_000).toFixed(2)}M`
                    : `$${(Math.abs(cr.brechaPesos)/1_000).toFixed(0)}K`}
                </span>
              </div>
            )}
          </div>
        </div>
      )}


      {/* Presets rápidos */}
      <div className="flex gap-1.5 flex-wrap">
        {PRESETS.map(({ label, value }) => {
          const isActive = !custom && (
            value === null ? activePreset === null : activePreset === value
          );
          return (
            <button
              key={label}
              onClick={() => applyPreset(value)}
              className={`flex-1 min-w-[56px] py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 active:bg-slate-500/50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sliders custom */}
      {custom && (
        <div className="space-y-3 pt-1">
          {/* Slider inicio */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Desde</span>
              <span className="text-blue-400 font-semibold">{startYear}</span>
            </div>
            <input
              type="range"
              min={minYear}
              max={endYear - 1}
              value={startYear}
              onChange={e => onChangeStart(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-0.5">
              <span>{minYear}</span>
              <span>{endYear - 1}</span>
            </div>
          </div>

          {/* Slider fin */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Hasta</span>
              <span className="text-blue-400 font-semibold">{endYear}</span>
            </div>
            <input
              type="range"
              min={startYear + 1}
              max={maxYear}
              value={endYear}
              onChange={e => onChangeEnd(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-0.5">
              <span>{startYear + 1}</span>
              <span>{maxYear}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
