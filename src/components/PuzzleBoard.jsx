import { useNavigate } from 'react-router-dom';
import { Trophy, RotateCcw } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import PuzzlePiece from './PuzzlePiece';

export default function PuzzleBoard({ isUnlocked, isCompleted, completedCount, resetProgress }) {
  const navigate = useNavigate();

  const allDone = completedCount === CHAPTERS.length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Hero banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-4">
          <span>🧩</span>
          <span>7 pièces à débloquer</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Maîtrise Claude Code
        </h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
          Chaque pièce révèle une fonctionnalité de Claude Code. Complète les défis
          pour débloquer la suivante et assembler le puzzle complet.
        </p>
      </div>

      {/* Completion banner */}
      {allDone && (
        <div className="mb-8 p-5 rounded-xl border border-amber-400/30 bg-amber-400/10 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-lg font-bold text-amber-300 mb-1">
            Puzzle complété !
          </h3>
          <p className="text-sm text-amber-200/70">
            Tu maîtrises maintenant toutes les fonctionnalités de Claude Code.
          </p>
        </div>
      )}

      {/* Puzzle grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {CHAPTERS.map((chapter) => (
          <PuzzlePiece
            key={chapter.id}
            chapter={chapter}
            isUnlocked={isUnlocked(chapter.id)}
            isCompleted={isCompleted(chapter.id)}
            onClick={() => navigate(`/chapter/${chapter.slug}`)}
          />
        ))}
      </div>

      {/* Skills reminder */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span>⚡</span> Commandes disponibles dans Claude Code
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { cmd: '/hint', desc: 'Obtenir un indice pour le défi courant' },
            { cmd: '/validate', desc: 'Valider ton défi et débloquer la pièce' },
            { cmd: '/progress', desc: 'Voir ta progression complète' },
          ].map(({ cmd, desc }) => (
            <div
              key={cmd}
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
            >
              <code className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2 py-0.5 rounded shrink-0">
                {cmd}
              </code>
              <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-6 text-center">
        <button
          onClick={resetProgress}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--bg-card)]"
        >
          <RotateCcw size={12} />
          Recommencer depuis le début
        </button>
      </div>
    </div>
  );
}
