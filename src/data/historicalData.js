/**
 * Datos históricos: Salario bruto mensual del Profesor Adjunto con Dedicación Exclusiva
 * en Universidades Nacionales Argentinas (cargo testigo de la Paritaria Nacional Docente).
 *
 * Fuentes:
 * - Paritaria Nacional Docente (resoluciones ME)
 * - CONADU / FEDUN
 * - Ministerio de Educación de la Nación
 * - INDEC (IPC oficial) — nota: 2007-2015 datos cuestionados por intervención INDEC
 *
 * Método: salario básico bruto incluyendo FONID + adicionales nacionales,
 * sin adicionales propios de cada universidad.
 */
export const salaryData = [
  // ─── ERA CONVERTIBILIDAD ────────────────────────────────────────────────────
  { year: 1996, month: 1,  salarioPesos: 1250,  inflacionAnual: 0.2,   usdOficial: 1.00,  usdBlue: 1.00,  nota: "Convertibilidad 1:1" },
  { year: 1997, month: 1,  salarioPesos: 1280,  inflacionAnual: 0.5,   usdOficial: 1.00,  usdBlue: 1.00,  nota: "" },
  { year: 1998, month: 1,  salarioPesos: 1310,  inflacionAnual: 0.9,   usdOficial: 1.00,  usdBlue: 1.00,  nota: "" },
  { year: 1999, month: 1,  salarioPesos: 1290,  inflacionAnual: -1.2,  usdOficial: 1.00,  usdBlue: 1.00,  nota: "Deflación" },
  { year: 2000, month: 1,  salarioPesos: 1270,  inflacionAnual: -0.9,  usdOficial: 1.00,  usdBlue: 1.00,  nota: "Recesión" },
  { year: 2001, month: 1,  salarioPesos: 1200,  inflacionAnual: -1.5,  usdOficial: 1.00,  usdBlue: 1.00,  nota: "Recorte 13% sector público" },
  // ─── CRISIS Y PESIFICACIÓN ─────────────────────────────────────────────────
  { year: 2002, month: 6,  salarioPesos: 1350,  inflacionAnual: 41.0,  usdOficial: 3.48,  usdBlue: 3.60,  nota: "Devaluación / Pesificación" },
  { year: 2003, month: 1,  salarioPesos: 1500,  inflacionAnual: 3.7,   usdOficial: 2.95,  usdBlue: 3.00,  nota: "Recuperación" },
  { year: 2004, month: 1,  salarioPesos: 1750,  inflacionAnual: 6.1,   usdOficial: 2.96,  usdBlue: 3.00,  nota: "" },
  { year: 2005, month: 1,  salarioPesos: 2100,  inflacionAnual: 12.3,  usdOficial: 3.03,  usdBlue: 3.05,  nota: "Inicio recuperación paritaria" },
  // ─── KIRCHNERISMO / INFLACIÓN CRECIENTE ───────────────────────────────────
  { year: 2006, month: 1,  salarioPesos: 2650,  inflacionAnual: 9.8,   usdOficial: 3.07,  usdBlue: 3.10,  nota: "" },
  { year: 2007, month: 1,  salarioPesos: 3200,  inflacionAnual: 8.5,   usdOficial: 3.10,  usdBlue: 3.15,  nota: "⚠ INDEC intervenido — inflación real ~26%" },
  { year: 2008, month: 1,  salarioPesos: 4100,  inflacionAnual: 7.2,   usdOficial: 3.15,  usdBlue: 3.20,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2009, month: 1,  salarioPesos: 5200,  inflacionAnual: 7.7,   usdOficial: 3.73,  usdBlue: 3.85,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2010, month: 1,  salarioPesos: 6400,  inflacionAnual: 10.9,  usdOficial: 3.93,  usdBlue: 4.10,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2011, month: 1,  salarioPesos: 7800,  inflacionAnual: 9.5,   usdOficial: 4.00,  usdBlue: 4.30,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2012, month: 1,  salarioPesos: 9500,  inflacionAnual: 10.8,  usdOficial: 4.48,  usdBlue: 6.50,  nota: "Cepo cambiario — brecha creciente" },
  { year: 2013, month: 1,  salarioPesos: 11800, inflacionAnual: 10.9,  usdOficial: 5.45,  usdBlue: 9.50,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2014, month: 1,  salarioPesos: 14500, inflacionAnual: 23.9,  usdOficial: 8.53,  usdBlue: 12.00, nota: "Devaluación enero 2014" },
  { year: 2015, month: 1,  salarioPesos: 18500, inflacionAnual: 26.9,  usdOficial: 8.80,  usdBlue: 14.00, nota: "" },
  // ─── MACRI / APERTURA CAMBIARIA ───────────────────────────────────────────
  { year: 2016, month: 1,  salarioPesos: 22000, inflacionAnual: 40.9,  usdOficial: 14.80, usdBlue: 15.50, nota: "Fin cepo cambiario" },
  { year: 2017, month: 1,  salarioPesos: 28500, inflacionAnual: 24.8,  usdOficial: 15.77, usdBlue: 16.20, nota: "" },
  { year: 2018, month: 1,  salarioPesos: 34000, inflacionAnual: 47.6,  usdOficial: 39.00, usdBlue: 42.00, nota: "Crisis cambiaria — corrida" },
  { year: 2019, month: 1,  salarioPesos: 48000, inflacionAnual: 53.8,  usdOficial: 63.00, usdBlue: 75.00, nota: "Nuevo cepo — PASO agosto" },
  // ─── PANDEMIA / ALBERTO FERNÁNDEZ ─────────────────────────────────────────
  { year: 2020, month: 1,  salarioPesos: 63000, inflacionAnual: 36.1,  usdOficial: 85.00, usdBlue: 145.00, nota: "COVID — congelamiento salario 10 meses" },
  { year: 2021, month: 1,  salarioPesos: 78000, inflacionAnual: 50.9,  usdOficial: 104.0, usdBlue: 180.00, nota: "" },
  { year: 2022, month: 1,  salarioPesos: 105000, inflacionAnual: 94.8, usdOficial: 177.0, usdBlue: 320.00, nota: "Inflación récord post-2002" },
  { year: 2023, month: 1,  salarioPesos: 195000, inflacionAnual: 211.4,usdOficial: 350.0, usdBlue: 490.00, nota: "Hiperinflación — 3er mayor del mundo" },
  // ─── MILEI / MOTOSIERRA ───────────────────────────────────────────────────
  { year: 2023, month: 12, salarioPesos: 380000, inflacionAnual: 211.4,usdOficial: 800.0, usdBlue: 1020.0, nota: "Devaluación dic 2023 (+118%)" },
  { year: 2024, month: 6,  salarioPesos: 820000, inflacionAnual: 117.8,usdOficial: 950.0, usdBlue: 1270.0, nota: "Ajuste fiscal — licuación salarial" },
  { year: 2024, month: 12, salarioPesos: 1350000,inflacionAnual: 117.8,usdOficial: 1010.0,usdBlue: 1250.0, nota: "Veto presupuesto universitario" },
  { year: 2025, month: 6,  salarioPesos: 1950000,inflacionAnual: 36.0, usdOficial: 1065.0,usdBlue: 1290.0, nota: "Paritaria 2025" },
  { year: 2026, month: 1,  salarioPesos: 2350000,inflacionAnual: 28.0, usdOficial: 1100.0,usdBlue: 1380.0, nota: "Proyección — actualizar" },
];

/**
 * Datos anuales consolidados para el gráfico principal.
 * Cada punto = promedio o fin de año.
 */
export const annualData = (() => {
  const byYear = {};
  salaryData.forEach(d => {
    if (!byYear[d.year] || d.month >= byYear[d.year].month) {
      byYear[d.year] = d;
    }
  });
  return Object.values(byYear).sort((a, b) => a.year - b.year);
})();

/**
 * Calcula el poder adquisitivo real (base 100 en 1996).
 */
export const realPowerData = (() => {
  const base = annualData[0]?.salarioPesos || 1;
  let accumulated = 1; // acumulador de precios (base 1996 = 1)

  return annualData.map((d, i) => {
    if (i > 0) {
      accumulated *= (1 + (annualData[i - 1].inflacionAnual || 0) / 100);
    }
    const nominalIndex = (d.salarioPesos / base) * 100;
    const realIndex = nominalIndex / accumulated;
    const salarioEnPesos1996 = (d.salarioPesos / accumulated);

    // Incremento salarial nominal año vs año anterior (%)
    const incrementoSalarial = i === 0
      ? null
      : parseFloat(
          (((d.salarioPesos - annualData[i - 1].salarioPesos) / annualData[i - 1].salarioPesos) * 100).toFixed(1)
        );

    return {
      ...d,
      nominalIndex: Math.round(nominalIndex),
      realIndex: Math.round(realIndex),
      salarioReal1996: Math.round(salarioEnPesos1996),
      salarioUsdOficial: Math.round(d.salarioPesos / d.usdOficial),
      salarioUsdBlue: Math.round(d.salarioPesos / d.usdBlue),
      incrementoSalarial,
    };
  });
})();

/**
 * Categorías salariales (multiplicadores aproximados sobre Adj. Exclusiva = 1.0)
 */
export const categorias = [
  { id: 'adjunto_exclusiva', label: 'Prof. Adjunto - Exclusiva', multiplier: 1.0 },
  { id: 'titular_exclusiva', label: 'Prof. Titular - Exclusiva', multiplier: 1.35 },
  { id: 'asociado_exclusiva', label: 'Prof. Asociado - Exclusiva', multiplier: 1.18 },
  { id: 'adjunto_semiex',    label: 'Prof. Adjunto - Semi-excl.', multiplier: 0.64 },
  { id: 'jtp_exclusiva',     label: 'JTP - Exclusiva',            multiplier: 0.82 },
  { id: 'jtp_simple',        label: 'JTP - Simple',               multiplier: 0.24 },
  { id: 'ayudante_primera',  label: 'Ayudante de Primera - Simple',multiplier: 0.15 },
];
