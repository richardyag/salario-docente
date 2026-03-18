import { useState, useMemo } from 'react';
import { DollarSign, BarChart2, BookOpen, ChevronDown } from 'lucide-react';

import Header       from './components/Header';
import SalaryChart  from './components/SalaryChart';
import StatsCards   from './components/StatsCards';
import DollarPanel  from './components/DollarPanel';
import InfoPanel    from './components/InfoPanel';

import { realPowerData, categorias } from './data/historicalData';
import { useDollarRate } from './hooks/useDollarRate';

const FALLBACK_RATES = { oficial: 1100, blue: 1380, mep: 1250, crypto: 1360 };

export default function App() {
  // Modo principal: pesos o dólares
  const [mode, setMode] = useState('pesos');
  // Tipo de cambio seleccionado para análisis
  const [dolarType, setDolarType] = useState('blue');
  // Tipo de gráfico en modo pesos
  const [chartType, setChartType] = useState('combined');
  // Categoría docente
  const [categoriaId, setCategoriaId] = useState('adjunto_exclusiva');
  // Año hasta el que mostrar
  const [endYear, setEndYear] = useState(Math.max(...realPowerData.map(d => d.year)));

  const { rates, loading, error, lastUpdate, refetch } = useDollarRate();
  const liveRates = rates || FALLBACK_RATES;

  const categoria = categorias.find(c => c.id === categoriaId);

  // Datos filtrados hasta el año seleccionado
  const filteredData = useMemo(
    () => realPowerData.filter(d => d.year <= endYear),
    [endYear]
  );

  const currentData = filteredData[filteredData.length - 1];
  const firstData   = filteredData[0];

  // Inyectamos cotizaciones en tiempo real al último dato
  const enrichedData = useMemo(() => {
    if (!rates) return filteredData;
    return filteredData.map((d, i) => {
      if (i < filteredData.length - 1) return d;
      // Último punto: usar cotizaciones live
      return {
        ...d,
        salarioUsdOficial: Math.round(d.salarioPesos / rates.oficial),
        salarioUsdBlue:    Math.round(d.salarioPesos / rates.blue),
      };
    });
  }, [filteredData, rates]);

  const years = [...new Set(realPowerData.map(d => d.year))].sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header onRefresh={refetch} lastUpdate={lastUpdate} />

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

        {/* ── TABS MODO ─────────────────────────────────────────── */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode('pesos')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              mode === 'pesos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            En Pesos
          </button>
          <button
            onClick={() => setMode('usd')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              mode === 'usd'
                ? 'bg-green-600 text-white shadow-lg shadow-green-900/50'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Dolarizar
          </button>
        </div>

        {/* ── OPCIONES GRÁFICO PESOS ────────────────────────────── */}
        {mode === 'pesos' && (
          <div className="flex gap-2">
            {[
              { id: 'combined', label: 'Con inflación' },
              { id: 'simple',   label: 'Solo salario' },
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
          </div>
        )}

        {/* ── PANEL DÓLAR ──────────────────────────────────────── */}
        {mode === 'usd' && (
          <DollarPanel
            rates={liveRates}
            loading={loading}
            error={error}
            dolarType={dolarType}
            onChangeDolarType={setDolarType}
          />
        )}

        {/* ── GRÁFICO ──────────────────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">
              {mode === 'pesos' ? 'Evolución salarial 1996–2026' : 'Salario en dólares 1996–2026'}
            </h2>
            {mode === 'pesos' && (
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
            )}
          </div>
          <SalaryChart
            data={enrichedData}
            mode={mode}
            dolarType={dolarType}
            categoria={categoria}
            chartType={chartType}
          />
          {mode === 'pesos' && (
            <p className="text-xs text-slate-500 mt-2 text-center">
              La línea verde muestra el salario con el mismo poder de compra que en 1996
            </p>
          )}
          {mode === 'usd' && (
            <p className="text-xs text-amber-400/70 mt-2 text-center">
              ⚠ 2007–2015: datos INDEC cuestionados — inflación real fue mayor
            </p>
          )}
        </div>

        {/* ── TARJETAS DE ESTADÍSTICAS ─────────────────────────── */}
        <StatsCards
          currentData={currentData}
          firstData={firstData}
          mode={mode}
          dolarType={dolarType === 'ambos' ? 'blue' : dolarType}
          rates={liveRates}
          categoria={categoria}
        />

        {/* ── SELECTOR DE AÑO FINAL ────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Período analizado: 1996 → {endYear}</span>
            <span className="text-xs text-blue-400 font-semibold">{endYear}</span>
          </div>
          <input
            type="range"
            min={years[0]}
            max={years[years.length - 1]}
            value={endYear}
            onChange={e => setEndYear(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{years[0]}</span>
            <span>{years[years.length - 1]}</span>
          </div>
        </div>

        {/* ── TABLA DETALLE ────────────────────────────────────── */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex items-center gap-2 p-3 border-b border-slate-700/50">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-white">Tabla de datos</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-900/60">
                <tr className="text-slate-400">
                  <th className="px-3 py-2 text-left font-medium">Año</th>
                  <th className="px-3 py-2 text-right font-medium">Salario $</th>
                  <th className="px-3 py-2 text-right font-medium">Inflación</th>
                  <th className="px-3 py-2 text-right font-medium">USD Of.</th>
                  <th className="px-3 py-2 text-right font-medium">USD Blue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {enrichedData.slice(-15).map((d, i) => {
                  const sal   = Math.round(d.salarioPesos * categoria.multiplier);
                  const usdOf = Math.round(sal / d.usdOficial);
                  const usdBl = Math.round(sal / d.usdBlue);
                  return (
                    <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-3 py-2 font-medium text-white">
                        {d.year}
                        {d.nota && <span className="ml-1 text-yellow-400">*</span>}
                      </td>
                      <td className="px-3 py-2 text-right text-blue-300">
                        {sal >= 1_000_000
                          ? `$${(sal/1_000_000).toFixed(2)}M`
                          : `$${(sal/1_000).toFixed(0)}K`}
                      </td>
                      <td className={`px-3 py-2 text-right font-medium ${
                        d.inflacionAnual > 50 ? 'text-red-400' :
                        d.inflacionAnual > 20 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {d.inflacionAnual > 0 ? '+' : ''}{d.inflacionAnual}%
                      </td>
                      <td className="px-3 py-2 text-right text-cyan-300">USD {usdOf.toLocaleString('es-AR')}</td>
                      <td className="px-3 py-2 text-right text-purple-300">USD {usdBl.toLocaleString('es-AR')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="px-3 py-2 text-xs text-slate-500 border-t border-slate-700/30">
            * Ver nota en metodología — mostrando últimos 15 períodos
          </p>
        </div>

        {/* ── INFO METODOLOGÍA ─────────────────────────────────── */}
        <InfoPanel />

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-800">
          <p>Datos: INDEC · Paritaria Nacional Docente · CONADU · FEDUN</p>
          <p className="mt-1">Cotizaciones: dolarapi.com — actualizadas en tiempo real</p>
          <p className="mt-1 text-slate-600">v1.0 · Marzo 2026</p>
        </footer>
      </main>
    </div>
  );
}
