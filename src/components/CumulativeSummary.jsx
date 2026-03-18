import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function fmt(n, decimals = 1) {
  return `${n > 0 ? '+' : ''}${n.toFixed(decimals)}%`;
}

function fmtPesos(n) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? '-' : '+'}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000)     return `${n < 0 ? '-' : '+'}$${(abs / 1_000).toFixed(0)}K`;
  return `${n < 0 ? '-' : '+'}$${abs}`;
}

export default function CumulativeSummary({ filteredData, categoria, rates, dolarType }) {
  if (!filteredData || filteredData.length < 2) return null;

  const first   = filteredData[0];
  const last    = filteredData[filteredData.length - 1];
  const mult    = categoria.multiplier;
  const years   = last.year - first.year;

  // ── Salarios del cargo elegido ──────────────────────────────────────────
  const salFirst = first.salarioPesos * mult;
  const salLast  = last.salarioPesos  * mult;

  // ── Los tres indicadores deben ser algebraicamente dependientes:
  //    realFactor = nominalFactor / inflFactor
  //    → si nominal < inflación, SIEMPRE hay pérdida real (sin excepciones)
  //
  //    realIndex en historicalData acumula inflación hasta el año ANTERIOR al
  //    actual (accumulated[i] usa inflacion[i-1]), por eso derivamos inflFactor
  //    del ratio y no lo calculamos por separado, evitando inconsistencias
  //    por desfase de un año.

  const nominalFactor = salLast / salFirst;
  const realFactor    = last.realIndex / first.realIndex;   // fuente de verdad
  const inflFactor    = nominalFactor / realFactor;         // derivado, siempre consistente

  const incNominal  = (nominalFactor - 1) * 100;
  const incInflacion = (inflFactor   - 1) * 100;
  const realGain    = (realFactor    - 1) * 100;

  // ── Salario equivalente ─────────────────────────────────────────────────
  const salarioEsperado = salFirst * inflFactor;
  const brechaPesos     = salLast - salarioEsperado;

  // ── En dólares ───────────────────────────────────────────────────────────
  const rateKey = dolarType === 'ambos' ? 'blue' : dolarType;
  const rateNow = rates?.[rateKey] || last.usdBlue;
  const salUsdFirst = Math.round(salFirst / first.usdOficial);
  const salUsdLast  = Math.round(salLast  / rateNow);
  const realGainUsd = ((salUsdLast / salUsdFirst) - 1) * 100;

  const ganó = realGain >= 0;

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden">
      {/* Encabezado */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-700/40">
        <div className="flex items-center gap-2">
          {ganó
            ? <TrendingUp  className="w-4 h-4 text-emerald-400" />
            : <TrendingDown className="w-4 h-4 text-red-400" />}
          <span className="text-sm font-semibold text-white">
            Resultado acumulado — {years} años ({first.year}→{last.year})
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5 ml-6">{categoria.label}</p>
      </div>

      {/* Tabla comparativa */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-900/50">
            <tr className="text-slate-400">
              <th className="px-3 py-2 text-left font-medium">Concepto</th>
              <th className="px-3 py-2 text-right font-medium">{first.year}</th>
              <th className="px-3 py-2 text-right font-medium">{last.year}</th>
              <th className="px-3 py-2 text-right font-medium">Variación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/20">

            {/* Salario nominal */}
            <tr className="hover:bg-slate-700/10">
              <td className="px-3 py-2.5 text-slate-300">Salario nominal</td>
              <td className="px-3 py-2.5 text-right text-blue-300">
                {salFirst >= 1_000_000
                  ? `$${(salFirst/1_000_000).toFixed(2)}M`
                  : salFirst >= 1_000
                  ? `$${(salFirst/1_000).toFixed(0)}K`
                  : `$${Math.round(salFirst)}`}
              </td>
              <td className="px-3 py-2.5 text-right text-blue-300">
                {salLast >= 1_000_000
                  ? `$${(salLast/1_000_000).toFixed(2)}M`
                  : salLast >= 1_000
                  ? `$${(salLast/1_000).toFixed(0)}K`
                  : `$${Math.round(salLast)}`}
              </td>
              <td className="px-3 py-2.5 text-right text-blue-300 font-semibold">
                {fmt(incNominal, 0)}
              </td>
            </tr>

            {/* Inflación acumulada */}
            <tr className="hover:bg-slate-700/10">
              <td className="px-3 py-2.5 text-slate-300">Inflación acumulada</td>
              <td className="px-3 py-2.5 text-right text-slate-500">—</td>
              <td className="px-3 py-2.5 text-right text-slate-500">—</td>
              <td className={`px-3 py-2.5 text-right font-semibold ${
                incInflacion > 200 ? 'text-red-400' :
                incInflacion > 100 ? 'text-orange-400' : 'text-amber-400'
              }`}>
                {fmt(incInflacion, 0)}
              </td>
            </tr>

            {/* Resultado real — la fila clave */}
            <tr className={`${ganó ? 'bg-emerald-950/40' : 'bg-red-950/40'}`}>
              <td className="px-3 py-2.5 font-semibold text-white">
                {ganó ? '▲ Ganancia real' : '▼ Pérdida real'}
              </td>
              <td className="px-3 py-2.5 text-right text-slate-500">—</td>
              <td className="px-3 py-2.5 text-right text-slate-500">—</td>
              <td className={`px-3 py-2.5 text-right text-lg font-bold ${ganó ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(realGain, 1)}
              </td>
            </tr>

            {/* Salario que debería tener */}
            <tr className="hover:bg-slate-700/10 bg-slate-900/30">
              <td className="px-3 py-2.5 text-slate-400 text-xs leading-tight">
                Salario si hubiera seguido la inflación
              </td>
              <td className="px-3 py-2.5 text-right text-slate-500">—</td>
              <td className="px-3 py-2.5 text-right text-slate-300">
                {salarioEsperado >= 1_000_000
                  ? `$${(salarioEsperado/1_000_000).toFixed(2)}M`
                  : `$${(salarioEsperado/1_000).toFixed(0)}K`}
              </td>
              <td className={`px-3 py-2.5 text-right text-xs font-semibold ${brechaPesos >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmtPesos(brechaPesos)}
              </td>
            </tr>

            {/* En dólares */}
            <tr className="hover:bg-slate-700/10">
              <td className="px-3 py-2.5 text-slate-300">
                En USD
                <span className="ml-1 text-slate-500 capitalize">({rateKey})</span>
              </td>
              <td className="px-3 py-2.5 text-right text-cyan-300">
                USD {salUsdFirst.toLocaleString('es-AR')}
              </td>
              <td className="px-3 py-2.5 text-right text-cyan-300">
                USD {salUsdLast.toLocaleString('es-AR')}
              </td>
              <td className={`px-3 py-2.5 text-right font-semibold ${realGainUsd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(realGainUsd, 1)}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* Interpretación en lenguaje natural */}
      <div className={`px-3 py-2.5 border-t ${ganó ? 'border-emerald-900/40 bg-emerald-950/30' : 'border-red-900/40 bg-red-950/30'}`}>
        <p className={`text-xs leading-relaxed ${ganó ? 'text-emerald-300' : 'text-red-300'}`}>
          {ganó
            ? `En ${years} años el salario creció ${fmt(incNominal,0)} nominal pero la inflación fue ${fmt(incInflacion,0)}, resultando en una ganancia real de ${fmt(realGain,1)}. Cada peso de ${first.year} vale hoy ${(salLast/salarioEsperado).toFixed(2)} pesos equivalentes.`
            : `En ${years} años el salario creció ${fmt(incNominal,0)} nominal pero la inflación fue ${fmt(incInflacion,0)}, resultando en una pérdida real de ${fmt(realGain,1)}. Faltan ${fmtPesos(Math.abs(brechaPesos))} mensuales para recuperar el poder de compra de ${first.year}.`
          }
        </p>
      </div>
    </div>
  );
}
