import { TrendingUp, TrendingDown } from 'lucide-react';

function fmt(n, decimals = 1) {
  return `${n > 0 ? '+' : ''}${n.toFixed(decimals)}%`;
}

function fmtPesos(n) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? '-' : '+'}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000)     return `${n < 0 ? '-' : '+'}$${(abs / 1_000).toFixed(0)}K`;
  return `${n < 0 ? '-' : '+'}$${abs}`;
}

export default function CumulativeSummary({ filteredData, categoria }) {
  if (!filteredData || filteredData.length < 2) return null;

  const first   = filteredData[0];
  const last    = filteredData[filteredData.length - 1];
  const mult    = categoria.multiplier;
  const years   = last.year - first.year;

  const salFirst = first.salarioPesos * mult;
  const salLast  = last.salarioPesos  * mult;

  const nominalFactor = salLast / salFirst;
  const realFactor    = last.realIndex / first.realIndex;   // fuente de verdad
  const inflFactor    = nominalFactor / realFactor;         // derivado, siempre consistente

  const incNominal   = (nominalFactor - 1) * 100;
  const incInflacion = (inflFactor   - 1) * 100;
  const realGain     = (realFactor   - 1) * 100;

  // Métrica sindical: cuánto superó la inflación al salario, sobre el salario
  // Ejemplo: nominal +519%, inflación +822% → (822-519)/519 = +58.4%
  const brechaPorc = incInflacion > incNominal
    ? ((incInflacion - incNominal) / Math.abs(incNominal)) * 100
    : null;

  const salarioEsperado = salFirst * inflFactor;
  const brechaPesos     = salLast - salarioEsperado;

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

            {/* Brecha sindical: cuánto superó la inflación al salario */}
            {brechaPorc !== null && (
              <tr className="bg-red-950/30 hover:bg-red-950/50">
                <td className="px-3 py-2.5 text-slate-400 text-xs leading-tight">
                  La inflación superó al salario en
                  <span className="block text-slate-500 text-[10px]">(sobre la suba salarial)</span>
                </td>
                <td className="px-3 py-2.5 text-right text-slate-500">—</td>
                <td className="px-3 py-2.5 text-right text-slate-500">—</td>
                <td className="px-3 py-2.5 text-right text-red-300 font-bold text-sm">
                  +{brechaPorc.toFixed(1)}%
                </td>
              </tr>
            )}

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

          </tbody>
        </table>
      </div>

      {/* Interpretación en lenguaje natural */}
      <div className={`px-3 py-2.5 border-t ${ganó ? 'border-emerald-900/40 bg-emerald-950/30' : 'border-red-900/40 bg-red-950/30'}`}>
        <p className={`text-xs leading-relaxed ${ganó ? 'text-emerald-300' : 'text-red-300'}`}>
          {ganó
            ? `En ${years} años el salario creció ${fmt(incNominal,0)} nominal pero la inflación fue ${fmt(incInflacion,0)}, resultando en una ganancia real de ${fmt(realGain,1)}.`
            : `En ${years} años el salario creció ${fmt(incNominal,0)} nominal pero la inflación fue ${fmt(incInflacion,0)}, resultando en una pérdida de poder adquisitivo del ${Math.abs(realGain).toFixed(1)}%. Faltan ${fmtPesos(Math.abs(brechaPesos))} mensuales para recuperar el poder de compra de ${first.year}.`
          }
        </p>
      </div>
    </div>
  );
}
