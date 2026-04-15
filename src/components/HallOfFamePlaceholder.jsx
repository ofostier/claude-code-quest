import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

// This component is built by the user during Chapter 7 (Master Build)
export default function HallOfFamePlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-white mb-10 transition-colors"
      >
        <ArrowLeft size={14} />
        Retour au puzzle
      </button>

      <div className="p-10 rounded-2xl border-2 border-dashed border-amber-500/30 bg-amber-500/5">
        <Trophy size={48} className="mx-auto mb-4 text-amber-400/50" />
        <h1 className="text-2xl font-bold text-amber-300/70 mb-3">
          Hall of Fame
        </h1>
        <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto leading-relaxed">
          Cette page est à construire dans le <strong className="text-white">défi de la Pièce 7</strong>.
          <br /><br />
          Lance Claude Code et suis les instructions du chapitre Master Build !
        </p>
      </div>
    </div>
  );
}
