import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Header({ completedCount, totalCount }) {
  const pct = Math.round((completedCount / totalCount) * 100);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl">🧩</div>
            <div>
              <h1 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
                Claude Code Quest
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Maîtrise Claude Code pièce par pièce
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {completedCount}/{totalCount} pièces
                </div>
                <div className="text-xs text-[var(--text-secondary)]">{pct}% complété</div>
              </div>
              <div className="w-24 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border)]">
                <div className="progress-bar h-full" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
