import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine, ReferenceDot
} from 'recharts';

const EVENTS = {
  2002: 'Crisis 2001',
  2007: '⚠ INDEC',
  2016: 'Fin cepo',
  2018: 'Crisis USD',
  2020: 'COVID',
  2023: 'Hiperinf.',
};

const LABEL_MAP = {
  salarioNominal:     'Salario Nominal $',
  salarioReal1996:    'Poder Adq. Real',
  salarioUsdOficial:  'USD Oficial',
  salarioUsdBlue:     'USD Blue',
  inflacionAnual:     'Inflación anual',
  incrementoSalarial: 'Incremento salarial',
};

function formatAxis(val) {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `${(val / 1_000).toFixed(0)}K`;
  return val;
}

function formatValue(val, key) {
  if (val == null) return '—';
  if (key === 'inflacionAnual' || key === 'incrementoSalarial') return `${val > 0 ? '+' : ''}${val}%`;
  if (key.includes('Usd') || key.includes('usd')) return `USD ${val.toLocaleString('es-AR')}`;
  return `$${val.toLocaleString('es-AR')}`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // Separar los datos en dos grupos: salario y porcentajes
  const pctEntries = payload.filter(e =>
    e.dataKey === 'inflacionAnual' || e.dataKey === 'incrementoSalarial'
  );
  const salEntries = payload.filter(e =>
    e.dataKey !== 'inflacionAnual' && e.dataKey !== 'incrementoSalarial'
  );

  // Calcular brecha si existen ambas líneas de %
  const infl  = pctEntries.find(e => e.dataKey === 'inflacionAnual')?.value;
  const incr  = pctEntries.find(e => e.dataKey === 'incrementoSalarial')?.value;
  const brecha = (infl != null && incr != null) ? parseFloat((incr - infl).toFixed(1)) : null;

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 shadow-2xl text-xs max-w-[220px]">
      <p className="font-bold text-white mb-2">{label}</p>

      {salEntries.map((entry, i) => (
        <div key={i} className="flex justify-between gap-3 mb-1">
          <span style={{ color: entry.color }}>{LABEL_MAP[entry.dataKey] || entry.dataKey}</span>
          <span className="font-semibold text-white">{formatValue(entry.value, entry.dataKey)}</span>
        </div>
      ))}

      {pctEntries.length > 0 && (
        <>
          <div className="border-t border-slate-700 my-2" />
          {pctEntries.map((entry, i) => (
            <div key={i} className="flex justify-between gap-3 mb-1">
              <span style={{ color: entry.color }}>{LABEL_MAP[entry.dataKey] || entry.dataKey}</span>
              <span className="font-semibold text-white">{formatValue(entry.value, entry.dataKey)}</span>
            </div>
          ))}
          {brecha !== null && (
            <div className={`flex justify-between gap-3 mt-1.5 pt-1.5 border-t border-slate-700 font-bold`}>
              <span className={brecha >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {brecha >= 0 ? '▲ Ganancia real' : '▼ Pérdida real'}
              </span>
              <span className={brecha >= 0 ? 'text-emerald-300' : 'text-red-300'}>
                {brecha > 0 ? '+' : ''}{brecha}%
              </span>
            </div>
          )}
        </>
      )}

      {EVENTS[label] && (
        <p className="mt-2 text-yellow-300 text-xs border-t border-slate-600 pt-1">{EVENTS[label]}</p>
      )}
    </div>
  );
};

export default function SalaryChart({ data, mode, dolarType, categoria, chartType, logScale }) {
  if (!data?.length) return null;

  const mult = categoria.multiplier;
  const chartData = data.map(d => ({
    year:               d.year,
    salarioNominal:     Math.max(1, Math.round(d.salarioPesos * mult)),
    salarioReal1996:    Math.max(1, Math.round(d.salarioReal1996 * mult)),
    salarioUsdOficial:  Math.max(1, Math.round(d.salarioUsdOficial * mult)),
    salarioUsdBlue:     Math.max(1, Math.round(d.salarioUsdBlue * mult)),
    inflacionAnual:     d.inflacionAnual,
    incrementoSalarial: d.incrementoSalarial ?? null,
  }));

  const isPesos = mode === 'pesos';
  const isUsd   = mode === 'usd';
  const showPct  = isPesos && chartType === 'combined';

  const scaleProps = logScale
    ? { scale: 'log', domain: ['auto', 'auto'], allowDataOverflow: false }
    : {};

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 44, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />

          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#475569' }}
            interval={chartData.length > 20 ? 4 : chartData.length > 10 ? 2 : 1}
          />

          {/* Eje izquierdo: salario en $ */}
          <YAxis
            yAxisId="salary"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickFormatter={formatAxis}
            tickLine={false}
            axisLine={false}
            width={48}
            {...scaleProps}
          />

          {/* Eje derecho: porcentajes (inflación + incremento) */}
          {showPct && (
            <YAxis
              yAxisId="pct"
              orientation="right"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={v => `${v}%`}
              tickLine={false}
              axisLine={false}
              width={40}
            />
          )}

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            formatter={value => LABEL_MAP[value] || value}
          />

          {/* Marcadores de eventos */}
          {Object.keys(EVENTS).map(yr => (
            <ReferenceLine
              key={yr}
              x={Number(yr)}
              yAxisId="salary"
              stroke="#fbbf24"
              strokeDasharray="4 4"
              strokeOpacity={0.3}
            />
          ))}

          {/* ── MODO PESOS ─────────────────────────────────────── */}
          {isPesos && (
            <>
              {/* Barras salario nominal */}
              <Bar
                yAxisId="salary"
                dataKey="salarioNominal"
                fill="#3b82f6"
                fillOpacity={0.55}
                radius={[2, 2, 0, 0]}
              />
              {/* Línea poder adquisitivo real */}
              <Line
                yAxisId="salary"
                type="monotone"
                dataKey="salarioReal1996"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />

              {/* Líneas de % en el eje derecho */}
              {showPct && (
                <>
                  {/* Incremento salarial — línea principal de comparación */}
                  <Line
                    yAxisId="pct"
                    type="monotone"
                    dataKey="incrementoSalarial"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    dot={{ fill: '#22d3ee', r: 3 }}
                    activeDot={{ r: 6 }}
                    connectNulls={false}
                  />
                  {/* Inflación — con qué comparar */}
                  <Line
                    yAxisId="pct"
                    type="monotone"
                    dataKey="inflacionAnual"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="6 3"
                  />
                </>
              )}
            </>
          )}

          {/* ── MODO USD ───────────────────────────────────────── */}
          {isUsd && dolarType === 'oficial' && (
            <Line yAxisId="salary" type="monotone" dataKey="salarioUsdOficial"
              stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: '#22d3ee', r: 3 }} />
          )}
          {isUsd && dolarType === 'blue' && (
            <Line yAxisId="salary" type="monotone" dataKey="salarioUsdBlue"
              stroke="#a78bfa" strokeWidth={2.5} dot={{ fill: '#a78bfa', r: 3 }} />
          )}
          {isUsd && dolarType === 'ambos' && (
            <>
              <Line yAxisId="salary" type="monotone" dataKey="salarioUsdOficial"
                stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Line yAxisId="salary" type="monotone" dataKey="salarioUsdBlue"
                stroke="#a78bfa" strokeWidth={2} dot={false} />
            </>
          )}
          {isUsd && dolarType === 'mep' && (
            <Line yAxisId="salary" type="monotone" dataKey="salarioUsdOficial"
              stroke="#34d399" strokeWidth={2.5} dot={{ fill: '#34d399', r: 3 }} />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Referencia visual del eje derecho */}
      {showPct && (
        <div className="flex items-center justify-center gap-4 mt-1 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-0.5 bg-cyan-400 rounded" />
            <span className="text-slate-400">Incremento salarial %</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-0.5 bg-orange-400 rounded opacity-70"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg,#fb923c 0,#fb923c 4px,transparent 4px,transparent 7px)' }} />
            <span className="text-slate-400">Inflación %</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-60" />
            <span className="text-slate-400">Salario $</span>
          </span>
        </div>
      )}
    </div>
  );
}
