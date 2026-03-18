/**
 * Salario bruto mensual del Profesor Adjunto con Dedicación Exclusiva
 * en Universidades Nacionales Argentinas — punto de referencia de la
 * Paritaria Nacional Docente (cargo testigo).
 *
 * METODOLOGÍA:
 * - Un único punto por año: salario vigente en ENERO de ese año.
 * - Usar enero garantiza comparaciones anuales consistentes.
 * - "salarioPesos" = básico bruto sin antigüedad (incluye FONID y sumas nacionales).
 * - "incrementoPactado" = % acordado en la Paritaria de ese año calendario
 *   (es el dato que se muestra en el gráfico para comparar vs inflación).
 *   Cuando supera la inflación → ganancia real; si es menor → pérdida.
 *
 * FUENTES:
 * - Ministerio de Educación de la Nación (resoluciones paritarias)
 * - CONADU / CONADU Histórica / FEDUN / FAGDUT / UDA
 * - INDEC (IPC nacional) — ⚠ 2007–2015: datos cuestionados por intervención
 * - La Nación (sep 2024, cifras básico bruto s/antig.)
 * - Infobae (ene 2026, cifras básico bruto s/antig.)
 * - Chequeado, Ámbito, BAE Negocios
 */
export const salaryData = [
  // ── CONVERTIBILIDAD ────────────────────────────────────────────────────────
  { year: 1996, salarioPesos:  1250, inflacionAnual:   0.2, incrementoPactado: null,  usdOficial: 1.00, usdBlue: 1.00,  nota: "Convertibilidad 1:1" },
  { year: 1997, salarioPesos:  1310, inflacionAnual:   0.5, incrementoPactado:  4.8,  usdOficial: 1.00, usdBlue: 1.00,  nota: "" },
  { year: 1998, salarioPesos:  1370, inflacionAnual:   0.9, incrementoPactado:  4.6,  usdOficial: 1.00, usdBlue: 1.00,  nota: "" },
  { year: 1999, salarioPesos:  1340, inflacionAnual:  -1.2, incrementoPactado: -2.2,  usdOficial: 1.00, usdBlue: 1.00,  nota: "Deflación" },
  { year: 2000, salarioPesos:  1290, inflacionAnual:  -0.9, incrementoPactado: -3.7,  usdOficial: 1.00, usdBlue: 1.00,  nota: "Recesión" },
  { year: 2001, salarioPesos:  1200, inflacionAnual:  -1.5, incrementoPactado: -7.0,  usdOficial: 1.00, usdBlue: 1.00,  nota: "Recorte 13% sector público (DNU 896/01)" },
  // ── CRISIS 2001 / PESIFICACIÓN ─────────────────────────────────────────────
  { year: 2002, salarioPesos:  1200, inflacionAnual:  41.0, incrementoPactado:  0.0,  usdOficial: 3.48, usdBlue: 3.60,  nota: "Sin aumento en año de crisis. Devaluación/Pesificación" },
  { year: 2003, salarioPesos:  1500, inflacionAnual:   3.7, incrementoPactado: 25.0,  usdOficial: 2.95, usdBlue: 3.00,  nota: "Inicio recuperación salarial" },
  { year: 2004, salarioPesos:  1750, inflacionAnual:   6.1, incrementoPactado: 16.7,  usdOficial: 2.96, usdBlue: 3.00,  nota: "" },
  { year: 2005, salarioPesos:  2100, inflacionAnual:  12.3, incrementoPactado: 20.0,  usdOficial: 3.03, usdBlue: 3.05,  nota: "Inicio recuperación paritaria" },
  // ── KIRCHNERISMO ───────────────────────────────────────────────────────────
  { year: 2006, salarioPesos:  2650, inflacionAnual:   9.8, incrementoPactado: 26.2,  usdOficial: 3.07, usdBlue: 3.10,  nota: "" },
  { year: 2007, salarioPesos:  3200, inflacionAnual:   8.5, incrementoPactado: 20.8,  usdOficial: 3.10, usdBlue: 3.15,  nota: "⚠ INDEC intervenido — inflación real estimada ~26%" },
  { year: 2008, salarioPesos:  4100, inflacionAnual:   7.2, incrementoPactado: 28.1,  usdOficial: 3.15, usdBlue: 3.20,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2009, salarioPesos:  5200, inflacionAnual:   7.7, incrementoPactado: 26.8,  usdOficial: 3.73, usdBlue: 3.85,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2010, salarioPesos:  6400, inflacionAnual:  10.9, incrementoPactado: 23.1,  usdOficial: 3.93, usdBlue: 4.10,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2011, salarioPesos:  7800, inflacionAnual:   9.5, incrementoPactado: 21.9,  usdOficial: 4.00, usdBlue: 4.30,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2012, salarioPesos:  9500, inflacionAnual:  10.8, incrementoPactado: 21.8,  usdOficial: 4.48, usdBlue: 6.50,  nota: "⚠ Datos INDEC cuestionados. Cepo cambiario" },
  { year: 2013, salarioPesos: 11800, inflacionAnual:  10.9, incrementoPactado: 24.2,  usdOficial: 5.45, usdBlue: 9.50,  nota: "⚠ Datos INDEC cuestionados" },
  { year: 2014, salarioPesos: 14500, inflacionAnual:  23.9, incrementoPactado: 22.9,  usdOficial: 8.53, usdBlue:12.00,  nota: "Devaluación enero 2014" },
  { year: 2015, salarioPesos: 18500, inflacionAnual:  26.9, incrementoPactado: 27.6,  usdOficial: 8.80, usdBlue:14.00,  nota: "" },
  // ── MACRI ──────────────────────────────────────────────────────────────────
  // 2016: Paritaria firmada en mayo (+15% jun, +8% ago, +8% sep = ~31%). Inflación 40.9% → PÉRDIDA
  { year: 2016, salarioPesos: 22000, inflacionAnual:  40.9, incrementoPactado: 31.0,  usdOficial:14.80, usdBlue:15.50,  nota: "Fin cepo. Paritaria: 31% vs inflación 40.9%" },
  // 2017: Paritaria ~25.4% (incluye cláusula gatillo 2.77% ejecutada en 2018) → casi empate
  { year: 2017, salarioPesos: 28820, inflacionAnual:  24.8, incrementoPactado: 25.4,  usdOficial:15.77, usdBlue:16.20,  nota: "Cláusula gatillo: 2.77% adicional en 2018. Inflación: 24.8%" },
  // 2018: Acuerdo 24–26% (CONADU Histórica no firmó). Inflación 47.6% → PÉRDIDA SEVERA
  { year: 2018, salarioPesos: 36100, inflacionAnual:  47.6, incrementoPactado: 26.0,  usdOficial:39.00, usdBlue:42.00,  nota: "Crisis cambiaria. Paritaria: 26% vs inflación 47.6%" },
  // 2019: Paritaria 23.19% + gatillo 7.19% + incorporaciones básico. Inflación 53.8% → PÉRDIDA
  { year: 2019, salarioPesos: 45500, inflacionAnual:  53.8, incrementoPactado: 30.4,  usdOficial:63.00, usdBlue:75.00,  nota: "Cláusula gatillo +7.19%. Incorporaciones básico: +33% total. Inflación: 53.8%" },
  // ── PANDEMIA / ALBERTO FERNÁNDEZ ───────────────────────────────────────────
  // 2020: Paritaria 16%+7% = 23% (COVID, congelamiento parcial). Inflación 36.1% → PÉRDIDA
  { year: 2020, salarioPesos: 59500, inflacionAnual:  36.1, incrementoPactado: 23.0,  usdOficial:85.00, usdBlue:145.00, nota: "COVID. Paritaria: 23% vs inflación 36.1%" },
  // 2021: Paritaria 47% (35%+12% adicional). Inflación 50.9% → LEVE PÉRDIDA
  { year: 2021, salarioPesos: 74300, inflacionAnual:  50.9, incrementoPactado: 47.0,  usdOficial:104.0, usdBlue:180.00, nota: "Paritaria: 47% vs inflación 50.9%" },
  // 2022: Paritaria 94% año / 105.1% interanual (dic-dic). Inflación 94.8% → EMPATE/LEVE GANANCIA
  { year: 2022, salarioPesos:111600, inflacionAnual:  94.8, incrementoPactado:105.1,  usdOficial:177.0, usdBlue:320.00, nota: "Paritaria 105.1% interanual (dic-dic) vs inflación 94.8% → pequeña ganancia real" },
  // 2023: Paritaria ~148% (mar-dic). Inflación 211.4% → PÉRDIDA SEVERA
  // Fuente: CONADU, FAGDUT. Salario Jan 2023 derivado de cadena paritaria
  { year: 2023, salarioPesos:183500, inflacionAnual: 211.4, incrementoPactado:148.5,  usdOficial:350.0, usdBlue:490.00, nota: "Paritaria: 148.5% vs inflación 211.4% → pérdida real severa" },
  // ── MILEI / LICUACIÓN SALARIAL ─────────────────────────────────────────────
  // 2024: Sin paritaria; aumentos unilaterales ~80%. Inflación 117.8% → PÉRDIDA SEVERA
  // Fuente: Chequeado, Ámbito, La Nación (septiembre 2024: Adjunto Excl. $881,000 básico bruto s/antig)
  // Enero 2024 derivado de la cadena de aumentos desde septiembre 2024 ($881K)
  { year: 2024, salarioPesos:559000, inflacionAnual: 117.8, incrementoPactado: 79.6,  usdOficial:820.0, usdBlue:1020.0, nota: "Sin paritaria. Aumentos unilaterales: 79.6% vs inflación 117.8% → pérdida -22.8% real (Chequeado/Ámbito)" },
  // 2025: Aumentos unilaterales (7.5% sep-nov + otros). Inflación ~36% → PÉRDIDA
  // Fuente: Argentina.gob.ar, Código Docente. Enero 2025 derivado de Oct 2024 + Oct increase
  { year: 2025, salarioPesos:940000, inflacionAnual:  36.0, incrementoPactado: 20.8,  usdOficial:1010.0,usdBlue:1270.0, nota: "Sin paritaria. Aumentos unilaterales ~21% vs inflación 36% → pérdida" },
  // 2026: Fuente: Infobae marzo 2026 (cifra exacta confirmada). Propuesta gov: 12.3% trimestral
  { year: 2026, salarioPesos:1135896,inflacionAnual:  28.0, incrementoPactado: 20.9,  usdOficial:1100.0,usdBlue:1380.0, nota: "Fuente: Infobae 16/03/2026 — básico bruto s/antigüedad. Pérdida acumulada 2024-2026: -34% real (Código Docente)" },
];

/** Un único punto por año → eliminamos la deduplicación por mes */
export const annualData = [...salaryData].sort((a, b) => a.year - b.year);

/**
 * Calcula el poder adquisitivo real (base 100 = año base = primer año del array).
 * "accumulated" = nivel de precios relativo al primer año, compuesto año a año.
 *
 * NOTA: accumulated[i] usa inflacion[i-1], por lo que el índice real en el año i
 * compara el salario de ese enero contra los precios de ese enero (deflactados
 * desde el año base). La inflación del año i aún no se ha "devengado" en enero.
 */
export const realPowerData = (() => {
  const base = annualData[0]?.salarioPesos || 1;
  let accumulated = 1;

  return annualData.map((d, i) => {
    if (i > 0) {
      accumulated *= (1 + (annualData[i - 1].inflacionAnual || 0) / 100);
    }

    const nominalIndex       = (d.salarioPesos / base) * 100;
    const realIndex          = nominalIndex / accumulated;
    const salarioReal1996    = d.salarioPesos / accumulated;

    // Incremento salarial Jan-to-Jan (calculado de los datos)
    const incrementoCalculado = i === 0 ? null
      : parseFloat(((d.salarioPesos - annualData[i - 1].salarioPesos) / annualData[i - 1].salarioPesos * 100).toFixed(1));

    // Usamos "incrementoPactado" cuando está disponible (dato de paritaria real)
    // y "incrementoCalculado" como respaldo. El pactado es más relevante para el análisis.
    const incrementoSalarial = d.incrementoPactado ?? incrementoCalculado;

    return {
      ...d,
      nominalIndex:      Math.round(nominalIndex),
      realIndex:         Math.round(realIndex * 10) / 10,
      salarioReal1996:   Math.round(salarioReal1996),
      salarioUsdOficial: Math.round(d.salarioPesos / d.usdOficial),
      salarioUsdBlue:    Math.round(d.salarioPesos / d.usdBlue),
      incrementoSalarial,
    };
  });
})();

/**
 * Categorías salariales — multiplicadores sobre Adjunto Exclusiva = 1.0
 * Fuente: grilla paritaria (ratios aproximados Jan 2026)
 * Titular Excl: $1,456,091 / $1,135,896 = 1.282
 * Asociado Excl: $1,295,710 / $1,135,896 = 1.141
 * JTP Excl: $975,510 / $1,135,896 = 0.859
 * Auxiliar 1ra Excl: $814,961 / $1,135,896 = 0.717
 */
export const categorias = [
  { id: 'adjunto_exclusiva',  label: 'Prof. Adjunto — Exclusiva',       multiplier: 1.000 },
  { id: 'titular_exclusiva',  label: 'Prof. Titular — Exclusiva',        multiplier: 1.282 },
  { id: 'asociado_exclusiva', label: 'Prof. Asociado — Exclusiva',       multiplier: 1.141 },
  { id: 'adjunto_semiex',     label: 'Prof. Adjunto — Semi-exclusiva',   multiplier: 0.618 },
  { id: 'jtp_exclusiva',      label: 'JTP — Exclusiva',                  multiplier: 0.859 },
  { id: 'jtp_simple',         label: 'JTP — Simple',                     multiplier: 0.252 },
  { id: 'ayudante_primera',   label: 'Ayudante de Primera — Simple',     multiplier: 0.177 },
];
