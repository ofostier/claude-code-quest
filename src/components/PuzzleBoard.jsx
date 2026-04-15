import { useNavigate } from 'react-router-dom';
import { Trophy, RotateCcw } from 'lucide-react';
import { getChapters } from '../data/chapters';
import { useLang } from '../i18n/LangContext';
import PuzzlePiece from './PuzzlePiece';

export default function PuzzleBoard({ isUnlocked, isCompleted, completedCount, resetProgress }) {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const chapters = getChapters(lang);
  const allDone = completedCount === chapters.length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Hero banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-500 mb-4">
          <span>🧩</span>
          <span>{t.puzzleBoard.badge}</span>
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          {t.puzzleBoard.heroTitle}
        </h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
          {t.puzzleBoard.heroDesc}
        </p>
      </div>

      {/* Completion banner */}
      {allDone && (
        <div className="mb-8 p-5 rounded-xl border border-amber-400/30 bg-amber-400/10 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-lg font-bold text-amber-500 mb-1">
            {t.puzzleBoard.completedTitle}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            {t.puzzleBoard.completedDesc}
          </p>
          <button
            onClick={() => navigate('/hall-of-fame')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-2 rounded-lg hover:brightness-110 transition-all"
          >
            <Trophy size={15} />
            {t.puzzleBoard.hallOfFame}
          </button>
        </div>
      )}

      {/* Puzzle grid */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
          >
            <PuzzlePiece
              chapter={chapter}
              isUnlocked={isUnlocked(chapter.id)}
              isCompleted={isCompleted(chapter.id)}
              onClick={() => navigate(`/chapter/${chapter.slug}`)}
            />
          </div>
        ))}
      </div>

      {/* Skills reminder */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <span>⚡</span> {t.puzzleBoard.commandsTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { cmd: '/hint', desc: t.puzzleBoard.commands.hint },
            { cmd: '/validate', desc: t.puzzleBoard.commands.validate },
            { cmd: '/progress', desc: t.puzzleBoard.commands.progress },
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
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--bg-card)]"
        >
          <RotateCcw size={12} />
          {t.puzzleBoard.reset}
        </button>
      </div>
    </div>
  );
}
