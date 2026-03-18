import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';

const EVENTS = {
  2002: 'Crisis 2001',
  2007: '⚠ INDEC',
  2016: 'Fin cepo',
  2018: 'Crisis USD',
  2020: 'COVID',
  2023: 'Hiperinf.',
};

function formatAxis(val) {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `${(val / 1_000).toFixed(0)}K`;
  return val;
}

function formatTooltipValue(val, name) {
  const label = name === 'salarioNominal' ? 'Salario Nominal' :
                name === 'salarioReal1996' ? 'Poder Adquisitivo Real' :
                name === 'salarioUsdOficial' ? 'USD Oficial' :
                name === 'salarioUsdBlue' ? 'USD Blue' :
                name === 'inflacionAnual' ? 'Inflación' : name;

  const formatted = name === 'inflacionAnual'
    ? `${val}%`
    : name.includes('Usd') || name.includes('usd')
      ? `USD ${val?.toLocaleString('es-AR')}`
      : `$${val?.toLocaleString('es-AR')}`;

  return [formatted, label];
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 shadow-2xl text-xs max-w-[200px]">
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex justify-between gap-3 mb-1">
          <span style={{ color: entry.color }}>{formatTooltipValue(entry.value, entry.dataKey)[1]}</span>
          <span className="font-semibold text-white">{formatTooltipValue(entry.value, entry.dataKey)[0]}</span>
        </div>
      ))}
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
    year: d.year,
    salarioNominal:    Math.max(1, Math.round(d.salarioPesos * mult)),
    salarioReal1996:   Math.max(1, Math.round(d.salarioReal1996 * mult)),
    salarioUsdOficial: Math.max(1, Math.round(d.salarioUsdOficial * mult)),
    salarioUsdBlue:    Math.max(1, Math.round(d.salarioUsdBlue * mult)),
    inflacionAnual:    d.inflacionAnual,
  }));

  const isPesos = mode === 'pesos';
  const isUsd   = mode === 'usd';
  const scaleProps = logScale
    ? { scale: 'log', domain: ['auto', 'auto'], allowDataOverflow: false }
    : {};

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#475569' }}
            interval={chartData.length > 20 ? 4 : chartData.length > 10 ? 2 : 1}
          />
          <YAxis
            yAxisId="salary"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickFormatter={formatAxis}
            tickLine={false}
            axisLine={false}
            width={48}
            {...scaleProps}
          />
          {chartType === 'combined' && (
            <YAxis
              yAxisId="inflation"
              orientation="right"
              tick={{ fill: '#f97316', fontSize: 10 }}
              tickFormatter={v => `${v}%`}
              tickLine={false}
              axisLine={false}
              width={40}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            formatter={(value) => {
              const map = {
                salarioNominal: 'Nominal $',
                salarioReal1996: 'Real ($ 1996)',
                salarioUsdOficial: 'USD Oficial',
                salarioUsdBlue: 'USD Blue',
                inflacionAnual: 'Inflación %',
              };
              return map[value] || value;
            }}
          />

          {/* Eventos históricos */}
          {Object.keys(EVENTS).map(yr => (
            <ReferenceLine
              key={yr}
              x={Number(yr)}
              yAxisId="salary"
              stroke="#fbbf24"
              strokeDasharray="4 4"
              strokeOpacity={0.4}
            />
          ))}

          {/* Líneas del gráfico según modo */}
          {isPesos && (
            <>
              <Bar
                yAxisId="salary"
                dataKey="salarioNominal"
                fill="#3b82f6"
                fillOpacity={0.6}
                radius={[2, 2, 0, 0]}
              />
              <Line
                yAxisId="salary"
                type="monotone"
                dataKey="salarioReal1996"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
              {chartType === 'combined' && (
                <Line
                  yAxisId="inflation"
                  type="monotone"
                  dataKey="inflacionAnual"
                  stroke="#f97316"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="5 3"
                />
              )}
            </>
          )}

          {isUsd && dolarType === 'oficial' && (
            <Line
              yAxisId="salary"
              type="monotone"
              dataKey="salarioUsdOficial"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={{ fill: '#22d3ee', r: 3 }}
            />
          )}
          {isUsd && dolarType === 'blue' && (
            <Line
              yAxisId="salary"
              type="monotone"
              dataKey="salarioUsdBlue"
              stroke="#a78bfa"
              strokeWidth={2.5}
              dot={{ fill: '#a78bfa', r: 3 }}
            />
          )}
          {isUsd && dolarType === 'ambos' && (
            <>
              <Line
                yAxisId="salary"
                type="monotone"
                dataKey="salarioUsdOficial"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="salary"
                type="monotone"
                dataKey="salarioUsdBlue"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={false}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
