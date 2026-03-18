import { GraduationCap, RefreshCw } from 'lucide-react';

export default function Header({ onRefresh, lastUpdate }) {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-4 shadow-xl">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-2 rounded-xl shadow-lg">
            <GraduationCap className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Salario Docente</h1>
            <p className="text-blue-200 text-xs">Universidades Nacionales · 1996–2026</p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors rounded-xl px-3 py-2 text-xs font-medium"
          title="Actualizar cotizaciones"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Actualizar</span>
        </button>
      </div>
      {lastUpdate && (
        <p className="text-center text-blue-300 text-xs mt-1">
          Actualizado: {lastUpdate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </header>
  );
}
