import { useState, useEffect } from 'react';

const FALLBACK = { oficial: 1100, blue: 1380, mep: 1250, crypto: 1360, fecha: 'sin datos' };

/**
 * Obtiene cotizaciones del dólar en tiempo real desde la API pública dolarapi.com
 */
export function useDollarRate() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dolarapi.com/v1/dolares', {
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const find = (casa) => data.find(d =>
        d.casa?.toLowerCase() === casa.toLowerCase() ||
        d.nombre?.toLowerCase().includes(casa.toLowerCase())
      );

      const oficial = find('oficial') || find('minorista');
      const blue    = find('blue') || find('informal');
      const mep     = find('bolsa') || find('mep');
      const crypto  = find('cripto') || find('usdc');

      setRates({
        oficial: oficial?.venta ?? FALLBACK.oficial,
        blue:    blue?.venta    ?? FALLBACK.blue,
        mep:     mep?.venta     ?? FALLBACK.mep,
        crypto:  crypto?.venta  ?? FALLBACK.crypto,
        fecha:   oficial?.fechaActualizacion ?? new Date().toISOString(),
      });
      setLastUpdate(new Date());
    } catch (err) {
      console.warn('Error fetching dollar rates, using fallback:', err.message);
      setRates(FALLBACK);
      setError('No se pudo actualizar. Usando último valor conocido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Auto-refresh cada 5 minutos
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { rates, loading, error, lastUpdate, refetch: fetchRates };
}
