import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

function formatPesos(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function StatsCards({ currentData, firstData, categoria }) {
  if (!currentData || !firstData) return null;

  const mult = categoria.multiplier;
  const salarioActual = Math.round(currentData.salarioPesos * mult);
  const salarioBase   = Math.round(firstData.salarioPesos * mult);

  const varNominal = ((salarioActual - salarioBase) / salarioBase * 100).toFixed(0);
  const perdioPoderReal = currentData.realIndex < firstData.realIndex;

  const nominalFactor = salarioActual / salarioBase;
  const realFactor    = currentData.realIndex / firstData.realIndex;
  const varReal       = ((realFactor - 1) * 100).toFixed(1);

  const cards = [
    {
      label: 'Salario Actual',
      value: formatPesos(salarioActual),
      sub: `${currentData.year}`,
      icon: TrendingUp,
      color: 'blue',
    },
    {
      label: `Salario en ${firstData.year}`,
      value: formatPesos(salarioBase),
      sub: 'inicio del período',
      icon: TrendingUp,
      color: 'slate',
    },
    {
      label: 'Variación Nominal',
      value: `+${Number(varNominal).toLocaleString('es-AR')}%`,
      sub: 'en pesos corrientes',
      icon: TrendingUp,
      color: 'green',
    },
    {
      label: 'Poder Adquisitivo Real',
      value: `${varReal > 0 ? '+' : ''}${varReal}%`,
      sub: 'vs. inflación acumulada',
      icon: perdioPoderReal ? TrendingDown : TrendingUp,
      color: perdioPoderReal ? 'red' : 'green',
      alert: perdioPoderReal,
    },
  ];

  const colorMap = {
    blue:  'bg-blue-900/60 border-blue-600/40 text-blue-200',
    green: 'bg-emerald-900/60 border-emerald-600/40 text-emerald-200',
    red:   'bg-red-900/60 border-red-600/40 text-red-200',
    slate: 'bg-slate-800/60 border-slate-600/40 text-slate-300',
  };

  const iconColorMap = {
    blue:  'text-blue-400',
    green: 'text-emerald-400',
    red:   'text-red-400',
    slate: 'text-slate-400',
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className={`rounded-xl border p-3 ${colorMap[card.color]} relative overflow-hidden`}
          >
            {card.alert && (
              <AlertTriangle className="absolute top-2 right-2 w-4 h-4 text-red-400 opacity-70" />
            )}
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={`w-4 h-4 ${iconColorMap[card.color]}`} />
              <span className="text-xs opacity-75 leading-tight">{card.label}</span>
            </div>
            <p className="text-lg font-bold text-white leading-tight">{card.value}</p>
            <p className="text-xs opacity-60 mt-0.5">{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
