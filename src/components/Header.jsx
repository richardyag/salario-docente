export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-3 shadow-xl">
      <div className="flex items-center gap-3 max-w-2xl mx-auto">
        <img
          src="/salario-docente/fadiunc.png"
          alt="FADIUNC"
          className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1 shadow-lg flex-shrink-0"
        />
        <div>
          <h1 className="text-base font-bold leading-tight">Salario Docente Universitario</h1>
          <p className="text-blue-200 text-xs">FADIUNC · UNCuyo · 1996–2026</p>
        </div>
      </div>
    </header>
  );
}
