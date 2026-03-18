import { useState } from 'react';
import { CalendarRange, Sliders } from 'lucide-react';

const PRESETS = [
  { label: '5 años',  value: 5 },
  { label: '10 años', value: 10 },
  { label: '15 años', value: 15 },
  { label: '20 años', value: 20 },
  { label: 'Todo',    value: null },
];

export default function PeriodSelector({ years, startYear, endYear, onChangeStart, onChangeEnd }) {
  const [custom, setCustom] = useState(false);

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

  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 space-y-3">
      {/* Título */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarRange className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-white">
            Período: {startYear} → {endYear}
            <span className="ml-2 text-xs text-slate-400 font-normal">
              ({endYear - startYear} años)
            </span>
          </span>
        </div>
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
