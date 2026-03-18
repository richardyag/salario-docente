import { DollarSign, Loader2, Wifi, WifiOff } from 'lucide-react';

const DOLLAR_TYPES = [
  { id: 'oficial', label: 'Oficial', color: 'text-blue-400' },
  { id: 'blue',    label: 'Blue',    color: 'text-purple-400' },
  { id: 'mep',     label: 'MEP',     color: 'text-cyan-400' },
  { id: 'crypto',  label: 'Cripto',  color: 'text-amber-400' },
  { id: 'ambos',   label: 'Of+Blue', color: 'text-green-400' },
];

export default function DollarPanel({ rates, loading, error, dolarType, onChangeDolarType }) {
  if (!rates && loading) {
    return (
      <div className="flex items-center justify-center py-4 gap-2 text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Cargando cotizaciones...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-white">Cotizaciones del Dólar</span>
        </div>
        {error
          ? <WifiOff className="w-4 h-4 text-red-400" title={error} />
          : <Wifi className="w-4 h-4 text-green-400" title="Datos en tiempo real" />
        }
      </div>

      {/* Cotizaciones actuales */}
      {rates && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { key: 'oficial', label: 'Oficial', color: 'blue' },
            { key: 'blue',    label: 'Blue',    color: 'purple' },
            { key: 'mep',     label: 'MEP',     color: 'cyan' },
            { key: 'crypto',  label: 'Cripto',  color: 'amber' },
          ].map(({ key, label, color }) => (
            <div key={key} className={`bg-slate-900/50 rounded-lg p-2 border border-${color}-900/30`}>
              <p className={`text-xs text-${color}-400 font-medium`}>{label}</p>
              <p className="text-white font-bold text-sm">
                ${rates[key]?.toLocaleString('es-AR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Selector tipo de cambio para el gráfico */}
      <p className="text-xs text-slate-400 mb-2">Mostrar en gráfico:</p>
      <div className="flex flex-wrap gap-1.5">
        {DOLLAR_TYPES.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => onChangeDolarType(id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              dolarType === id
                ? 'bg-white text-slate-900'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
          <WifiOff className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
