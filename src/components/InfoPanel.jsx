import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const NOTES = [
  {
    title: '¿Qué salario se muestra?',
    text: 'Salario bruto mensual del cargo testigo de la Paritaria Nacional Docente, incluyendo FONID y adicionales nacionales. No incluye antigüedad ni adicionales de cada universidad.',
  },
  {
    title: '⚠ Datos INDEC 2007–2015',
    text: 'Durante ese período el INDEC fue intervenido políticamente. La inflación oficial publicada subestimaba la inflación real. Los gráficos reflejan los datos oficiales, pero el poder adquisitivo real fue peor que lo que muestran.',
    warning: true,
  },
  {
    title: '¿Qué es el "Poder Adquisitivo Real"?',
    text: 'Es el salario nominal deflactado por la inflación acumulada desde 1996. Un valor de 80 significa que el salario real cayó un 20% en términos de bienes y servicios que puede comprar el docente.',
  },
  {
    title: '¿Qué significa dolarizar?',
    text: 'Convierte el salario al tipo de cambio seleccionado para comparar la situación internacional del docente argentino. El dólar oficial refleja la paridad legal; el blue/MEP refleja el poder de compra real en bienes dolarizados.',
  },
  {
    title: 'Fuentes de datos',
    text: 'Resoluciones de la Paritaria Nacional Docente (ME) · CONADU (Confederación Nacional de Docentes Universitarios) · CONADU Histórica · FEDUN (Federación de Docentes de las Universidades) · INDEC (IPC nacional) · dolarapi.com (cotizaciones en tiempo real). CONADU Histórica es la federación que nuclea a las asociaciones de base de orientación clasista e independiente del gobierno.',
  },
];

export default function InfoPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-slate-800/40 rounded-xl border border-slate-700/40 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Metodología y fuentes</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {open && (
        <div className="border-t border-slate-700/40 divide-y divide-slate-700/30">
          {NOTES.map((note, i) => (
            <div key={i}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-slate-700/20 transition-colors"
              >
                <span className={`text-xs font-medium ${note.warning ? 'text-amber-400' : 'text-slate-200'}`}>
                  {note.title}
                </span>
                {expanded === i
                  ? <ChevronUp className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 ml-2" />
                  : <ChevronDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 ml-2" />
                }
              </button>
              {expanded === i && (
                <p className="px-3 pb-3 text-xs text-slate-400 leading-relaxed">{note.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
