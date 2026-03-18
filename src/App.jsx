import { useState, useMemo } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

import Header          from './components/Header';
import SalaryChart     from './components/SalaryChart';
import StatsCards      from './components/StatsCards';
import InfoPanel       from './components/InfoPanel';
import LossCounter      from './components/LossCounter';
import PeriodSelector   from './components/PeriodSelector';
import CumulativeSummary from './components/CumulativeSummary';

import { realPowerData, categorias } from './data/historicalData';

const ALL_YEARS = [...new Set(realPowerData.map(d => d.year))].sort((a, b) => a - b);
const MAX_YEAR  = ALL_YEARS[ALL_YEARS.length - 1];
const MIN_YEAR  = ALL_YEARS[0];

export default function App() {
  const [chartType,   setChartType  ] = useState('combined');
  const [logScale,    setLogScale   ] = useState(true);
  const [categoriaId, setCategoriaId] = useState('adjunto_exclusiva');

  // Período: por defecto últimos 10 años
  const [startYear, setStartYear] = useState(MAX_YEAR - 10);
  const [endYear,   setEndYear  ] = useState(MAX_YEAR);

  const categoria = categorias.find(c => c.id === categoriaId);

  const filteredData = useMemo(
    () => realPowerData.filter(d => d.year >= startYear && d.year <= endYear),
    [startYear, endYear]
  );

  const currentData = filteredData[filteredData.length - 1];
  const firstData   = filteredData[0];

  // Salario actual del cargo elegido (para el contador de pérdida)
  const salarioActual   = Math.round((currentData?.salarioPesos || 0) * categoria.multiplier);
  const inflacionActual = currentData?.inflacionAnual || 0;

  // Resultado acumulado del período — se pasa al tooltip del PeriodSelector
  const cumulativeResult = useMemo(() => {
    if (!firstData || !currentData || firstData === currentData) return null;
    const mult          = categoria.multiplier;
    const salFirst      = firstData.salarioPesos  * mult;
    const salLast       = currentData.salarioPesos * mult;
    const nominalFactor = salLast / salFirst;
    const realFactor    = currentData.realIndex / firstData.realIndex;
    const inflFactor    = nominalFactor / realFactor;
    const incNominal    = (nominalFactor - 1) * 100;
    const incInflacion  = (inflFactor   - 1) * 100;
    const realGain      = (realFactor   - 1) * 100;
    const salarioEsperado = salFirst * inflFactor;
    const brechaPesos   = salLast - salarioEsperado;
    return { incNominal, incInflacion, realGain, brechaPesos };
  }, [firstData, currentData, categoria]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">

        {/* ── SELECTOR DE CATEGORÍA ─────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 block mb-1.5 font-medium">Cargo docente</label>
          <div className="relative">
            <select
              value={categoriaId}
              onChange={e => setCategoriaId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm appearance-none pr-8 focus:outline-none focus:border-blue-500"
            >
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* ── CONTADOR DE PÉRDIDA POR SEGUNDO ──────────────────── */}
        <LossCounter
          salarioBruto={salarioActual}
          inflacionAnual={inflacionActual}
          categoriaLabel={categoria.label}
        />

        {/* ── SELECTOR DE PERÍODO ──────────────────────────────── */}
        <PeriodSelector
          years={ALL_YEARS}
          startYear={startYear}
          endYear={endYear}
          onChangeStart={setStartYear}
          onChangeEnd={setEndYear}
          cumulativeResult={cumulativeResult}
        />

        {/* ── OPCIONES GRÁFICO ──────────────────────────────────── */}
        <div className="flex gap-2">
          {[
            { id: 'combined', label: 'Con inflación' },
            { id: 'simple',   label: 'Solo salario'  },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setChartType(id)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                chartType === id
                  ? 'bg-blue-800 text-blue-100'
                  : 'bg-slate-800/40 text-slate-400 hover:bg-slate-700/40'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setLogScale(s => !s)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
              logScale
                ? 'bg-amber-900/60 text-amber-300 border-amber-700/50'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/40'
            }`}
            title="Escala logarítmica: útil para ver toda la evolución 1996–2026"
          >
            Log
          </button>
        </div>

        {/* ── GRÁFICO ──────────────────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">
              Evolución salarial {startYear}–{endYear}
            </h2>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-blue-500 opacity-70" />
                <span className="text-slate-400">Nominal</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-4 h-0.5 bg-emerald-400" />
                <span className="text-slate-400">Real</span>
              </span>
            </div>
          </div>
          <SalaryChart
            data={filteredData}
            categoria={categoria}
            chartType={chartType}
            logScale={logScale}
          />
          <p className="text-xs text-slate-500 mt-2 text-center">
            {logScale
              ? 'Escala logarítmica — muestra toda la evolución proporcional'
              : 'La línea verde = mismo poder de compra que en ' + startYear}
          </p>
        </div>

        {/* ── RESULTADO ACUMULADO DEL PERÍODO ─────────────────── */}
        <CumulativeSummary
          filteredData={filteredData}
          categoria={categoria}
        />

        {/* ── TARJETAS DE ESTADÍSTICAS ─────────────────────────── */}
        <StatsCards
          currentData={currentData}
          firstData={firstData}
          categoria={categoria}
        />

        {/* ── TABLA DETALLE ────────────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex items-center gap-2 p-3 border-b border-slate-700/50">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-white">
              Tabla de datos
              <span className="ml-2 text-xs text-slate-400 font-normal">
                {startYear}–{endYear}
              </span>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-900/60">
                <tr className="text-slate-400">
                  <th className="px-3 py-2 text-left font-medium">Año</th>
                  <th className="px-3 py-2 text-right font-medium">Salario $</th>
                  <th className="px-3 py-2 text-right font-medium">Inflación</th>
                  <th className="px-3 py-2 text-right font-medium">Aumento pactado</th>
                  <th className="px-3 py-2 text-right font-medium">Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredData.map((d, i) => {
                  const sal  = Math.round(d.salarioPesos * categoria.multiplier);
                  const diff = d.incrementoSalarial != null
                    ? parseFloat((d.incrementoSalarial - d.inflacionAnual).toFixed(1))
                    : null;
                  return (
                    <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-3 py-2 font-medium text-white">
                        {d.year}
                        {d.nota && <span className="ml-1 text-yellow-400" title={d.nota}>*</span>}
                      </td>
                      <td className="px-3 py-2 text-right text-blue-300">
                        {sal >= 1_000_000
                          ? `$${(sal/1_000_000).toFixed(2)}M`
                          : sal >= 1_000
                          ? `$${(sal/1_000).toFixed(0)}K`
                          : `$${sal}`}
                      </td>
                      <td className={`px-3 py-2 text-right font-medium ${
                        d.inflacionAnual > 50 ? 'text-red-400' :
                        d.inflacionAnual > 20 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {d.inflacionAnual > 0 ? '+' : ''}{d.inflacionAnual}%
                      </td>
                      <td className="px-3 py-2 text-right text-cyan-300">
                        {d.incrementoSalarial != null
                          ? `${d.incrementoSalarial > 0 ? '+' : ''}${d.incrementoSalarial}%`
                          : '—'}
                      </td>
                      <td className={`px-3 py-2 text-right font-semibold ${
                        diff === null ? 'text-slate-500' :
                        diff >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {diff === null ? '—' : `${diff > 0 ? '+' : ''}${diff}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredData.some(d => d.nota) && (
            <p className="px-3 py-2 text-xs text-slate-500 border-t border-slate-700/30">
              * Ver nota en metodología
            </p>
          )}
        </div>

        {/* ── INFO METODOLOGÍA ─────────────────────────────────── */}
        <InfoPanel />

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-800">
          <p>Datos: INDEC · Paritaria Nacional Docente · CONADU · CONADU Histórica · FEDUN</p>
          <p className="mt-1 text-slate-600">v1.2 · Sindicato Docente UNCuyo · Marzo 2026</p>
        </footer>
      </main>
    </div>
  );
}
