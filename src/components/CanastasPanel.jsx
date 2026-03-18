import { ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';
import { cbtPorAño } from '../data/historicalData';

function fmt(n, d = 2) { return n.toFixed(d); }
function fmtPesos(n) {
  if (n >= 1_000_000) return `$${(n/1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n/1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}

export default function CanastasPanel({ filteredData, categoria }) {
  if (!filteredData || filteredData.length < 2) return null;

  const first = filteredData[0];
  const last  = filteredData[filteredData.length - 1];
  const mult  = categoria.multiplier;

  const cbtFirst = cbtPorAño[first.year];
  const cbtLast  = cbtPorAño[last.year];
  if (!cbtFirst || !cbtLast) return null;

  const salFirst = first.salarioPesos * mult;
  const salLast  = last.salarioPesos  * mult;

  const canastasFirst = salFirst / cbtFirst;
  const canastasLast  = salLast  / cbtLast;
  const varCanastas   = canastasLast - canastasFirst;
  const perdio        = varCanastas < 0;

  // Para el gráfico de barras interno, tomamos todos los años con CBT disponible
  const puntos = filteredData
    .filter(d => cbtPorAño[d.year])
    .map(d => ({
      year:     d.year,
      canastas: (d.salarioPesos * mult) / cbtPorAño[d.year],
    }));

  const maxCanastas = Math.max(...puntos.map(p => p.canastas));

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden">
      {/* Encabezado */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-700/40">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-white">
            Canastas Básicas que cubre el salario
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5 ml-6">
          {categoria.label} · Canasta familiar (2 adultos + 2 menores)
        </p>
      </div>

      {/* Dos grandes números */}
      <div className="grid grid-cols-2 divide-x divide-slate-700/40">
        <div className="px-4 py-4 text-center">
          <p className="text-xs text-slate-400 mb-1">{first.year}</p>
          <p className="text-4xl font-black text-violet-300 tabular-nums">{fmt(canastasFirst)}</p>
          <p className="text-xs text-slate-500 mt-1">canastas/mes</p>
          <p className="text-xs text-slate-600 mt-0.5">CBT: {fmtPesos(cbtFirst)}</p>
        </div>
        <div className="px-4 py-4 text-center relative">
          <p className="text-xs text-slate-400 mb-1">{last.year}</p>
          <p className={`text-4xl font-black tabular-nums ${perdio ? 'text-red-300' : 'text-emerald-300'}`}>
            {fmt(canastasLast)}
          </p>
          <p className="text-xs text-slate-500 mt-1">canastas/mes</p>
          <p className="text-xs text-slate-600 mt-0.5">CBT: {fmtPesos(cbtLast)}</p>
          {/* Badge variación */}
          <div className={`absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-xs font-bold ${
            perdio ? 'bg-red-900/60 text-red-300' : 'bg-emerald-900/60 text-emerald-300'
          }`}>
            {perdio ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
            {perdio ? '' : '+'}{fmt(varCanastas)}
          </div>
        </div>
      </div>

      {/* Mini gráfico de barras */}
      <div className="px-3 pb-3">
        <p className="text-xs text-slate-500 mb-2">Evolución por año</p>
        <div className="flex items-end gap-0.5 h-16">
          {puntos.map(p => {
            const pct = (p.canastas / maxCanastas) * 100;
            const isFirst = p.year === first.year;
            const isLast  = p.year === last.year;
            const color = p.canastas < 1
              ? 'bg-red-500'
              : p.canastas < 2
              ? 'bg-orange-500'
              : p.canastas < 3
              ? 'bg-amber-500'
              : 'bg-violet-500';
            return (
              <div key={p.year} className="flex-1 flex flex-col items-center gap-0.5 group relative">
                <div
                  className={`w-full rounded-t transition-all ${color} ${isFirst || isLast ? 'opacity-100' : 'opacity-60'}`}
                  style={{ height: `${pct}%` }}
                />
                {/* Tooltip en hover */}
                <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                  <div className="bg-slate-900 border border-slate-600 rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-xl">
                    <span className="text-white font-bold">{p.year}</span>
                    <span className="text-violet-300 ml-1">{fmt(p.canastas)} canastas</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Eje X con años relevantes */}
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>{first.year}</span>
          <span>{last.year}</span>
        </div>
      </div>

      {/* Interpretación */}
      <div className={`px-3 py-2.5 border-t text-xs leading-relaxed ${
        perdio
          ? 'border-red-900/40 bg-red-950/30 text-red-300'
          : 'border-emerald-900/40 bg-emerald-950/30 text-emerald-300'
      }`}>
        {canastasLast < 1
          ? `⚠ El salario de ${last.year} no alcanza para cubrir una sola canasta básica familiar. En ${first.year} cubría ${fmt(canastasFirst)} canastas.`
          : perdio
          ? `El salario pasó de cubrir ${fmt(canastasFirst)} canastas en ${first.year} a solo ${fmt(canastasLast)} en ${last.year}. Perdió ${fmt(Math.abs(varCanastas))} canastas de capacidad de compra.`
          : `El salario pasó de ${fmt(canastasFirst)} canastas en ${first.year} a ${fmt(canastasLast)} en ${last.year}. Ganó ${fmt(varCanastas)} canastas de capacidad de compra.`
        }
        <span className="block text-slate-500 mt-0.5">
          Fuente CBT: INDEC / CIFRA-CTA (aproximado) ·
          {(first.year >= 2007 && first.year <= 2015) || (last.year >= 2007 && last.year <= 2015)
            ? ' ⚠ período con datos INDEC cuestionados'
            : ' valores de enero de cada año'}
        </span>
      </div>
    </div>
  );
}
