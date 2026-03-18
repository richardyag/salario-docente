import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

function formatPesos(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function formatUSD(n) {
  return `USD ${n.toLocaleString('es-AR')}`;
}

export default function StatsCards({ currentData, firstData, mode, dolarType, rates, categoria }) {
  if (!currentData || !firstData) return null;

  const mult = categoria.multiplier;
  const salarioActual = Math.round(currentData.salarioPesos * mult);
  const salarioBase   = Math.round(firstData.salarioPesos * mult);

  const varNominal = ((salarioActual - salarioBase) / salarioBase * 100).toFixed(0);
  const varReal    = Math.round(currentData.realIndex * mult - 100);

  const usdActual  = mode === 'usd'
    ? Math.round((salarioActual / rates[dolarType]) || 0)
    : null;
  const usdBase    = mode === 'usd'
    ? Math.round((salarioBase / firstData.usdOficial) || 0)
    : null;

  const perdioPoderReal = currentData.realIndex < 100;
  const perdioEnUsd = usdActual < usdBase;

  const cards = mode === 'pesos' ? [
    {
      label: 'Salario Actual',
      value: formatPesos(salarioActual),
      sub: `${currentData.year}`,
      icon: TrendingUp,
      color: 'blue',
    },
    {
      label: 'Salario en 1996',
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
  ] : [
    {
      label: `Salario en USD (${dolarType === 'oficial' ? 'Oficial' : dolarType === 'blue' ? 'Blue' : dolarType === 'mep' ? 'MEP' : 'Cripto'})`,
      value: formatUSD(usdActual),
      sub: `al ${currentData.year}`,
      icon: DollarSign,
      color: perdioEnUsd ? 'red' : 'green',
      alert: perdioEnUsd,
    },
    {
      label: 'Salario en USD (1996)',
      value: formatUSD(usdBase),
      sub: 'paridad 1:1 convertibilidad',
      icon: DollarSign,
      color: 'slate',
    },
    {
      label: 'Variación en USD',
      value: `${perdioEnUsd ? '' : '+'}${Math.round(((usdActual - usdBase) / usdBase) * 100)}%`,
      sub: 'vs. 1996',
      icon: perdioEnUsd ? TrendingDown : TrendingUp,
      color: perdioEnUsd ? 'red' : 'green',
      alert: perdioEnUsd,
    },
    {
      label: 'Tipo de cambio',
      value: `$${rates[dolarType]?.toLocaleString('es-AR')}`,
      sub: 'cotización actual',
      icon: DollarSign,
      color: 'amber',
    },
  ];

  const colorMap = {
    blue:  'bg-blue-900/60 border-blue-600/40 text-blue-200',
    green: 'bg-emerald-900/60 border-emerald-600/40 text-emerald-200',
    red:   'bg-red-900/60 border-red-600/40 text-red-200',
    slate: 'bg-slate-800/60 border-slate-600/40 text-slate-300',
    amber: 'bg-amber-900/60 border-amber-600/40 text-amber-200',
  };

  const iconColorMap = {
    blue:  'text-blue-400',
    green: 'text-emerald-400',
    red:   'text-red-400',
    slate: 'text-slate-400',
    amber: 'text-amber-400',
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
