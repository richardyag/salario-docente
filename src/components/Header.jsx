import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-4 shadow-xl">
      <div className="flex items-center gap-3 max-w-2xl mx-auto">
        <div className="bg-yellow-400 p-2 rounded-xl shadow-lg">
          <GraduationCap className="w-6 h-6 text-blue-900" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">Salario Docente Universitario</h1>
          <p className="text-blue-200 text-xs">Universidades Nacionales · 1996–2026 · UNCuyo</p>
        </div>
      </div>
    </header>
  );
}
