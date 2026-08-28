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
 * - El Destape (mar 2026: Adjunto Excl. $1.135.896 sin paritaria firmada)
 * - La Gaceta (abr 2026: pérdida real 50–65% bajo gestión Milei en 27 meses)
 * - INDEC IPC abr-2026: 2.6% mensual / ~12.6% acum. 2026 / ~32.0% interanual
 * - Infobae (12-may-2026: Adjunto Excl. $1.423.055 bruto s/antig. – pérdida 34.5%)
 * - Infozona (may-2026: aumentos 2026 → ene 2% + bono / mar +4.26% / jun +6.85% anunciado)
 * - INDEC IPC may-2026: 2.1% mensual / acum. ene-may 14.7% / interanual 33.2% (mín. en 8 meses)
 * - CONADU (10-jun-2026): acuerdo paritario +21.33% sobre básico mayo → garantía $1.497.941 (Adj.Excl.)
 * - ADUBA (jun-2026): tabla salarial jun-2026 confirma garantía $1.497.941,97 (Excl.)
 * - El Destape (jun-2026): pese al acuerdo el salario sigue ~25% abajo del nivel 2023
 * - Acuerdo además establece +3% en octubre 2026 y reapertura paritaria en 3 meses
 * - INDEC IPC jun-2026: 1.9% mensual / acum. ene-jun 16.9% (mínimo mensual desde ago-2025)
 * - INDEC IPC jul-2026: 2.1% mensual / acum. ene-jul 19.3% / interanual 33.8%
 * - CONADU/ADUBA: sin nuevo acuerdo desde jun-2026 — garantía $1.497.941,97 (Adj.Excl.) sigue vigente en ago-2026
 * - Reapertura paritaria comprometida antes del 15-sep-2026 (sin novedades al 28-ago-2026)
 * - Infobae/El Liberal (27–28 ago 2026): paro nacional CONADU 48h por salarios y Ley de Financiamiento
 *   Universitario — pérdida ~30% desde dic-2023, se reclama +50% de recomposición sobre el básico actual
 * - INDEC Canasta Básica Total jul-2026: $1.564.716 (familia 4) — mensual +2.2% / acum. 19.6% / interanual 36.1%
 * - Página/12, La Nación (26-ago-2026): Dólar oficial ~$1.530–1.540 venta / Blue ~$1.555–1.565 venta
 * - Chequeado, Ámbito, BAE Negocios
 *
 * Última actualización: 28 de agosto de 2026
 */
export const ultimaActualizacion = '28 de agosto de 2026';
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
  // 2026: Acuerdo paritario firmado jun-2026 (CONADU): +21.33% sobre básico mayo → garantía $1.497.941 (Adj.Excl.).
  // Aumentos previos no paritarios: ene +2% + bono / mar +4.26%. Acumulado ene-jun: ~31.9%.
  // Salario Adjunto Excl. enero 2026: $1.135.896. Mayo 2026: $1.423.055 (Infobae 12-may). Junio 2026: $1.497.941 (ADUBA).
  // Sin nuevo acuerdo desde jun-2026: la garantía $1.497.941,97 sigue vigente en ago-2026 (acumulado sin cambios: ~31.9%).
  // IPC INDEC: ene 2.2% / feb 2.4% / mar 3.4% / abr 2.6% / may 2.1% / jun 1.9% / jul 2.1%
  //   → acum. ene-jul 19.3% / interanual jul 33.8%.
  // Proyección inflación 2026: ~32% (19.3% acum. ene-jul + ~2% mensual promedio estimado ago-dic).
  // Paro nacional CONADU 27–28 ago 2026: pérdida ~30% desde dic-2023, reclamo +50% recomposición y Ley
  // de Financiamiento Universitario. +3% programado para oct-2026 (sobre básico sep). Reapertura de
  // paritaria comprometida antes del 15-sep-2026 (sin novedades al 28-ago-2026).
  // Dólar 2-ene-2026: Oficial $1.495 / Blue $1.530. BCRA con bandas cambiarias. Ago-2026: Oficial ~$1.535 / Blue ~$1.560.
  { year: 2026, salarioPesos:1135896,inflacionAnual:  32.0, incrementoPactado: 31.9,  usdOficial:1495.0,usdBlue:1530.0, nota: "1er acuerdo paritario en ~2 años (jun-2026): +21.33% → garantía $1.497.941,97 (Adj.Excl.), sin cambios desde entonces. Acum. ene-jun/ago ~31.9% vs IPC acum. ene-jul 19.3% → recuperación parcial. Paro nacional 27-28 ago 2026: pérdida ~30% desde dic-2023, se reclama +50% (CONADU/Infobae)" },
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
/**
 * Canasta Básica Total (familia tipo: matrimonio + 2 hijos menores)
 * Fuente: INDEC / CIFRA-CTA — valores aproximados de enero de cada año.
 * 2026: estimado a partir de INDEC jul-2026 ($1.564.716 familia 4) retropolado
 * con la variación acumulada 2026 (19.6% ene-jul).
 * ⚠ 2007-2015: datos INDEC cuestionados; valores subestimados.
 */
export const cbtPorAño = {
  1996:      400,
  1997:      402,
  1998:      405,
  1999:      392,
  2000:      383,
  2001:      365,
  2002:      470,
  2003:      470,
  2004:      490,
  2005:      570,
  2006:      670,
  2007:      830,
  2008:     1050,
  2009:     1280,
  2010:     1580,
  2011:     2000,
  2012:     2650,
  2013:     3450,
  2014:     4900,
  2015:     6700,
  2016:     9800,
  2017:    12800,
  2018:    19500,
  2019:    33000,
  2020:    46000,
  2021:    66000,
  2022:   128000,
  2023:   280000,
  2024:   490000,
  2025:   940000,
  2026:  1308000,
};

/**
 * Escala de antigüedad — CCT Docente Universitario, Art. 36
 * Fuente: CONADU Histórica (onaduhistorica.org.ar) — escala del CCT vigente.
 * 0 años: sin bonificación. Escala: 1a=10%, 2a=20%, 5a=30%, ..., 24a+=120%.
 */
export function calcAntiguedadFactor(years) {
  if (years <= 0)  return 1.00;
  if (years >= 24) return 2.20;
  if (years >= 22) return 2.10;
  if (years >= 20) return 2.00;
  if (years >= 17) return 1.80;
  if (years >= 15) return 1.70;
  if (years >= 12) return 1.60;
  if (years >= 10) return 1.50;
  if (years >= 7)  return 1.40;
  if (years >= 5)  return 1.30;
  if (years >= 2)  return 1.20;
  return 1.10;
}

/**
 * Antigüedad no-docentes — CCT 366/06 (FATUN)
 * 2% del básico por año de servicio reconocido, escala lineal. Max 25 años.
 * Sin mínimo garantizado (a diferencia de la escala docente).
 */
export function calcAntiguedadNoDocente(years) {
  if (years <= 0) return 1.00;
  return 1 + Math.min(years, 25) * 0.02;
}

/**
 * UNIVERSITARIOS — todos los cargos y dedicaciones
 * Fuente: CONADU "SUELDOS BRUTOS UNIVERSITARIOS DIC 2025 s/INST 1/2025"
 * Multiplicadores sobre Adj. Exclusiva = 1.000 ($1,135,895.61)
 */
export const categoriasUniversitarios = [
  { id: 'tit_excl',  label: 'Prof. Titular — Exclusiva',              grupo: 'Exclusiva',              shortLabel: 'Prof. Titular',   multiplier: 1.282 },
  { id: 'aso_excl',  label: 'Prof. Asociado — Exclusiva',             grupo: 'Exclusiva',              shortLabel: 'Prof. Asociado',  multiplier: 1.141 },
  { id: 'adj_excl',  label: 'Prof. Adjunto — Exclusiva',              grupo: 'Exclusiva',              shortLabel: 'Prof. Adjunto',   multiplier: 1.000 },
  { id: 'jtp_excl',  label: 'JTP — Exclusiva',                        grupo: 'Exclusiva',              shortLabel: 'JTP',             multiplier: 0.859 },
  { id: 'aux1_excl', label: 'Auxiliar de 1ra — Exclusiva',            grupo: 'Exclusiva',              shortLabel: 'Auxiliar 1ra',    multiplier: 0.717 },
  { id: 'tit_es',    label: 'Prof. Titular — Exclusiva + Simple',     grupo: 'Exclusiva + Simple',     shortLabel: 'Prof. Titular',   multiplier: 1.603 },
  { id: 'aso_es',    label: 'Prof. Asociado — Exclusiva + Simple',    grupo: 'Exclusiva + Simple',     shortLabel: 'Prof. Asociado',  multiplier: 1.426 },
  { id: 'adj_es',    label: 'Prof. Adjunto — Exclusiva + Simple',     grupo: 'Exclusiva + Simple',     shortLabel: 'Prof. Adjunto',   multiplier: 1.250 },
  { id: 'jtp_es',    label: 'JTP — Exclusiva + Simple',               grupo: 'Exclusiva + Simple',     shortLabel: 'JTP',             multiplier: 1.074 },
  { id: 'aux1_es',   label: 'Auxiliar de 1ra — Exclusiva + Simple',   grupo: 'Exclusiva + Simple',     shortLabel: 'Auxiliar 1ra',    multiplier: 0.897 },
  { id: 'tit_comp',  label: 'Prof. Titular — Completa (Semi+Simple)', grupo: 'Completa (Semi+Simple)', shortLabel: 'Prof. Titular',   multiplier: 0.962 },
  { id: 'aso_comp',  label: 'Prof. Asociado — Completa (Semi+Simple)',grupo: 'Completa (Semi+Simple)', shortLabel: 'Prof. Asociado',  multiplier: 0.856 },
  { id: 'adj_comp',  label: 'Prof. Adjunto — Completa (Semi+Simple)', grupo: 'Completa (Semi+Simple)', shortLabel: 'Prof. Adjunto',   multiplier: 0.750 },
  { id: 'jtp_comp',  label: 'JTP — Completa (Semi+Simple)',           grupo: 'Completa (Semi+Simple)', shortLabel: 'JTP',             multiplier: 0.644 },
  { id: 'aux1_comp', label: 'Auxiliar de 1ra — Completa (Semi+Simple)',grupo: 'Completa (Semi+Simple)',shortLabel: 'Auxiliar 1ra',    multiplier: 0.538 },
  { id: 'tit_semi',  label: 'Prof. Titular — Semiexclusiva',          grupo: 'Semiexclusiva',          shortLabel: 'Prof. Titular',   multiplier: 0.641 },
  { id: 'aso_semi',  label: 'Prof. Asociado — Semiexclusiva',         grupo: 'Semiexclusiva',          shortLabel: 'Prof. Asociado',  multiplier: 0.570 },
  { id: 'adj_semi',  label: 'Prof. Adjunto — Semiexclusiva',          grupo: 'Semiexclusiva',          shortLabel: 'Prof. Adjunto',   multiplier: 0.500 },
  { id: 'jtp_semi',  label: 'JTP — Semiexclusiva',                    grupo: 'Semiexclusiva',          shortLabel: 'JTP',             multiplier: 0.429 },
  { id: 'aux1_semi', label: 'Auxiliar de 1ra — Semiexclusiva',        grupo: 'Semiexclusiva',          shortLabel: 'Auxiliar 1ra',    multiplier: 0.359 },
  { id: 'tit_simp',  label: 'Prof. Titular — Simple',                 grupo: 'Simple',                 shortLabel: 'Prof. Titular',   multiplier: 0.321 },
  { id: 'aso_simp',  label: 'Prof. Asociado — Simple',                grupo: 'Simple',                 shortLabel: 'Prof. Asociado',  multiplier: 0.285 },
  { id: 'adj_simp',  label: 'Prof. Adjunto — Simple',                 grupo: 'Simple',                 shortLabel: 'Prof. Adjunto',   multiplier: 0.250 },
  { id: 'jtp_simp',  label: 'JTP — Simple',                           grupo: 'Simple',                 shortLabel: 'JTP',             multiplier: 0.215 },
  { id: 'aux1_simp', label: 'Auxiliar de 1ra — Simple',               grupo: 'Simple',                 shortLabel: 'Auxiliar 1ra',    multiplier: 0.179 },
  { id: 'aux2_simp', label: 'Auxiliar de 2da — Simple',               grupo: 'Simple',                 shortLabel: 'Auxiliar 2da',    multiplier: 0.144 },
];

/**
 * PREUNIVERSITARIOS — todos los cargos
 * Fuente: CONADU "SUELDOS BRUTOS PREUNIVERSITARIOS DIC 2025 s/INST 1/2025"
 * Hora catedra Nivel Medio = $35,233.13 -> 0.03102 x Adj.Excl. por hora
 */
export const categoriasPreuniversitarios = [
  { id: 'pnm_10h',  label: 'Docente Nivel Medio — 10 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '10 horas', multiplier: 0.310 },
  { id: 'pnm_12h',  label: 'Docente Nivel Medio — 12 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '12 horas', multiplier: 0.372 },
  { id: 'pnm_15h',  label: 'Docente Nivel Medio — 15 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '15 horas', multiplier: 0.465 },
  { id: 'pnm_18h',  label: 'Docente Nivel Medio — 18 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '18 horas', multiplier: 0.558 },
  { id: 'pnm_20h',  label: 'Docente Nivel Medio — 20 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '20 horas', multiplier: 0.620 },
  { id: 'pnm_24h',  label: 'Docente Nivel Medio — 24 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '24 horas', multiplier: 0.745 },
  { id: 'pnm_25h',  label: 'Docente Nivel Medio — 25 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '25 horas', multiplier: 0.776 },
  { id: 'pnm_30h',  label: 'Docente Nivel Medio — 30 hs',          grupo: 'Docentes Nivel Medio',     shortLabel: '30 horas', multiplier: 0.931 },
  { id: 'acp_nm',   label: 'Ayudante Clases Pract. Nivel Medio',   grupo: 'Auxiliares NM',            shortLabel: 'Ayud. Clases Pract.', multiplier: 0.297 },
  { id: 'jtp_nm',   label: 'JTP Nivel Medio',                      grupo: 'Auxiliares NM',            shortLabel: 'JTP',                 multiplier: 0.357 },
  { id: 'atp_nm',   label: 'Ayudante Tecnico Trab. Practicos',     grupo: 'Auxiliares NM',            shortLabel: 'Ayud. Tecnico TP',    multiplier: 0.297 },
  { id: 'mep',      label: 'Maestro/a de Ensenanza Practica',      grupo: 'Ensenanza Practica',       shortLabel: 'Maestro Ens. Pract.', multiplier: 0.521 },
  { id: 'mep_js',   label: 'Maestro/a EP — Jefe de Seccion',       grupo: 'Ensenanza Practica',       shortLabel: 'Maestro EP Jefe Sec.', multiplier: 0.573 },
  { id: 'jgep',     label: 'Jefe Gral. de Ensenanza Practica',     grupo: 'Ensenanza Practica',       shortLabel: 'Jefe Gral. EP',       multiplier: 0.625 },
  { id: 'jgtep',    label: 'Jefe Gral. Taller Ens. Practica',      grupo: 'Ensenanza Practica',       shortLabel: 'Jefe Gral. Taller EP', multiplier: 0.678 },
  { id: 'pns_12h',  label: 'Docente Nivel Superior — 12 hs',       grupo: 'Docentes Nivel Superior',  shortLabel: '12 hs Niv. Superior', multiplier: 0.465 },
  { id: 'acp_ns',   label: 'Ayudante Clases Pract. Niv. Superior', grupo: 'Docentes Nivel Superior',  shortLabel: 'Ayud. Clases Pract.', multiplier: 0.371 },
  { id: 'jtp_ns',   label: 'JTP Nivel Superior',                   grupo: 'Docentes Nivel Superior',  shortLabel: 'JTP',                 multiplier: 0.446 },
  { id: 'jdep_ns',  label: 'Jefe/Director Depto. Nivel Superior',  grupo: 'Docentes Nivel Superior',  shortLabel: 'Jefe/Dir. Dpto.',     multiplier: 0.733 },
  { id: 'mgrado',   label: 'Maestro/a de Grado',                   grupo: 'Nivel Primario e Inicial', shortLabel: 'Maestro de Grado',    multiplier: 0.620 },
  { id: 'mesp_p',   label: 'Maestro/a Especial Nivel Primario',    grupo: 'Nivel Primario e Inicial', shortLabel: 'Maestro Esp. Prim.',  multiplier: 0.734 },
  { id: 'mcoord',   label: 'Maestro/a Coordinador/a',              grupo: 'Nivel Primario e Inicial', shortLabel: 'Maestro Coordinador', multiplier: 0.659 },
  { id: 'mji',      label: 'Maestro/a Jardin de Infantes',         grupo: 'Nivel Primario e Inicial', shortLabel: 'Jardin de Infantes',  multiplier: 0.639 },
  { id: 'mjm',      label: 'Maestro/a Jardin Maternal',            grupo: 'Nivel Primario e Inicial', shortLabel: 'Jardin Maternal',     multiplier: 0.658 },
  { id: 'mesp_i',   label: 'Maestro/a Especial Nivel Inicial',     grupo: 'Nivel Primario e Inicial', shortLabel: 'Maestro Esp. Inic.',  multiplier: 0.734 },
  { id: 'prec',     label: 'Preceptor/a',                          grupo: 'Preceptores y Orientacion',shortLabel: 'Preceptor/a',         multiplier: 0.614 },
  { id: 'subjprec', label: 'Subjefe/a de Preceptores',             grupo: 'Preceptores y Orientacion',shortLabel: 'Subjefe Preceptores', multiplier: 0.682 },
  { id: 'jprec',    label: 'Jefe/a de Preceptores',                grupo: 'Preceptores y Orientacion',shortLabel: 'Jefe Preceptores',    multiplier: 0.737 },
  { id: 'orient',   label: 'Prof. Equipo de Orientacion',          grupo: 'Preceptores y Orientacion',shortLabel: 'Prof. Orientacion',   multiplier: 0.652 },
  { id: 'aorient',  label: 'Ayudante Equipo de Orientacion',       grupo: 'Preceptores y Orientacion',shortLabel: 'Ayud. Orientacion',   multiplier: 0.326 },
  { id: 'biblio',   label: 'Bibliotecario/a',                      grupo: 'Biblioteca',               shortLabel: 'Bibliotecario/a',     multiplier: 0.642 },
  { id: 'jbiblio',  label: 'Jefe/a de Biblioteca',                 grupo: 'Biblioteca',               shortLabel: 'Jefe de Biblioteca',  multiplier: 0.771 },
  { id: 'asped',    label: 'Asesor/a Pedagogico/a',                grupo: 'Conduccion y Gestion',     shortLabel: 'Asesor Pedagogico',   multiplier: 0.977 },
  { id: 'secr',     label: 'Secretario/a',                         grupo: 'Conduccion y Gestion',     shortLabel: 'Secretario/a',        multiplier: 0.931 },
  { id: 'prosecr',  label: 'Prosecretario/a',                      grupo: 'Conduccion y Gestion',     shortLabel: 'Prosecretario/a',     multiplier: 0.791 },
  { id: 'regente',  label: 'Regente',                              grupo: 'Conduccion y Gestion',     shortLabel: 'Regente',             multiplier: 0.931 },
  { id: 'subrgn',   label: 'Subregente',                           grupo: 'Conduccion y Gestion',     shortLabel: 'Subregente',          multiplier: 0.791 },
  { id: 'vicedr',   label: 'Vicerrector/a — Vicedirector/a',       grupo: 'Conduccion y Gestion',     shortLabel: 'Vicerrector/a',       multiplier: 1.387 },
  { id: 'rector',   label: 'Rector/a — Director/a',                grupo: 'Conduccion y Gestion',     shortLabel: 'Rector/a',            multiplier: 1.570 },
];

/**
 * NO DOCENTES — escala nacional FATUN / CCT 366/06
 * Multiplicadores sobre Adj. Exclusiva docente = 1.000 ($1,135,895.61 ene-2026)
 * Fuente: APUBA (UBA) mar-2024 extrapolado a ene-2026 con factor inflacionario docente.
 * ⚠ Valores aproximados — la escala puede variar segun universidad.
 */
export const categoriasNoDocentes = [
  { id: 'nd_cat1', label: 'Categoria 1 — Director / Jefe de Dpto.',  grupo: 'Tecnico-Profesional',    shortLabel: 'Cat. 1 — Director',     multiplier: 1.714 },
  { id: 'nd_cat2', label: 'Categoria 2 — Profesional / Supervisor',  grupo: 'Tecnico-Profesional',    shortLabel: 'Cat. 2 — Profesional',  multiplier: 1.429 },
  { id: 'nd_cat3', label: 'Categoria 3 — Tecnico Especializado',     grupo: 'Tecnico-Profesional',    shortLabel: 'Cat. 3 — Tecnico Esp.', multiplier: 1.190 },
  { id: 'nd_cat4', label: 'Categoria 4 — Tecnico Principal',         grupo: 'Tecnico-Administrativo', shortLabel: 'Cat. 4 — Tec. Princ.',  multiplier: 0.989 },
  { id: 'nd_cat5', label: 'Categoria 5 — Auxiliar Tecnico',          grupo: 'Tecnico-Administrativo', shortLabel: 'Cat. 5 — Aux. Tecnico', multiplier: 0.823 },
  { id: 'nd_cat6', label: 'Categoria 6 — Auxiliar Especializado',    grupo: 'Auxiliar de Servicios',  shortLabel: 'Cat. 6 — Aux. Espec.',  multiplier: 0.686 },
  { id: 'nd_cat7', label: 'Categoria 7 — Auxiliar General (ingres)', grupo: 'Auxiliar de Servicios',  shortLabel: 'Cat. 7 — Auxiliar',     multiplier: 0.572 },
];
