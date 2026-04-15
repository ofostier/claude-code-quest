import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLang } from '../i18n/LangContext';

export default function Header({ completedCount, totalCount }) {
  const pct = Math.round((completedCount / totalCount) * 100);
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang } = useLang();

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
              <p className="text-xs text-[var(--text-secondary)]">{t.header.tagline}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {completedCount}/{totalCount} {t.header.pieces}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">{pct}% {t.header.completed}</div>
              </div>
              <div className="w-24 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border)]">
                <div className="progress-bar h-full" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
              title={t.header.langLabel}
            >
              {t.header.langToggle}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
              title={theme === 'dark' ? t.header.toLightMode : t.header.toDarkMode}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
