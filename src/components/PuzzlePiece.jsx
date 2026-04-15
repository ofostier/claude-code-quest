import { Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function PuzzlePiece({ chapter, isUnlocked, isCompleted, onClick }) {
  const locked = !isUnlocked;
  const { t } = useLang();

  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className={[
        'relative w-full text-left rounded-xl border p-5 transition-all duration-200',
        locked
          ? 'piece-locked border-[var(--border)] bg-[var(--bg-card)] cursor-not-allowed'
          : isCompleted
          ? 'border-emerald-500/50 bg-[var(--bg-card)] card-hover cursor-pointer'
          : 'border-[var(--border)] bg-[var(--bg-card)] card-hover cursor-pointer hover:border-purple-500/50',
      ].join(' ')}
      style={
        !locked && isCompleted ? { boxShadow: '0 0 15px rgba(16,185,129,0.2)' } : undefined
      }
    >
      {/* Piece number badge */}
      <div
        className={[
          'absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
          locked
            ? 'bg-[var(--border)] text-[var(--text-secondary)]'
            : isCompleted
            ? 'bg-emerald-500 text-white'
            : 'bg-purple-500/20 text-purple-400',
        ].join(' ')}
      >
        {isCompleted ? <CheckCircle2 size={14} /> : chapter.id}
      </div>

      {/* Icon */}
      <div className="text-3xl mb-3 transition-transform duration-200">
        {locked ? '🔒' : chapter.icon}
      </div>

      {/* Title */}
      <div className="mb-1">
        <h3
          className={[
            'font-bold text-base leading-tight',
            locked ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]',
          ].join(' ')}
        >
          {chapter.title}
        </h3>
        <p
          className={[
            'text-xs mt-0.5',
            locked ? 'text-[var(--border)]' : 'text-[var(--text-secondary)]',
          ].join(' ')}
        >
          {chapter.subtitle}
        </p>
      </div>

      {/* Status + duration */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
        <span
          className={[
            'text-xs px-2 py-0.5 rounded-full font-medium',
            locked
              ? 'bg-[var(--border)]/30 text-[var(--text-secondary)]'
              : isCompleted
              ? 'bg-emerald-500/20 text-emerald-500'
              : 'bg-purple-500/20 text-purple-500',
          ].join(' ')}
        >
          {locked
            ? t.puzzlePiece.locked
            : isCompleted
            ? t.puzzlePiece.completed
            : t.puzzlePiece.available}
        </span>

        {!locked && (
          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <span>{chapter.duration}</span>
            <ChevronRight size={12} />
          </div>
        )}

        {locked && <Lock size={12} className="text-[var(--border)]" />}
      </div>
    </button>
  );
}
