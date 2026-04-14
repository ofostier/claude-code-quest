export default function Header({ completedCount, totalCount }) {
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧩</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                Claude Code Quest
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Maîtrise Claude Code pièce par pièce
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {completedCount}/{totalCount} pièces
              </div>
              <div className="text-xs text-[var(--text-secondary)]">{pct}% complété</div>
            </div>
            <div className="w-24 h-2 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border)]">
              <div
                className="progress-bar h-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
