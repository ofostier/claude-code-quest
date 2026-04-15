import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, BookOpen } from 'lucide-react';

// Load all chapter markdown files at build time
const docFiles = import.meta.glob('/docs/chapters/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function getDoc(chapterId) {
  const key = Object.keys(docFiles).find((k) =>
    k.includes(`/0${chapterId}-`)
  );
  return key ? docFiles[key] : null;
}

export default function DocPanel({ chapter, onClose }) {
  const content = getDoc(chapter.id);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl z-50 flex flex-col bg-[var(--bg-secondary)] border-l border-[var(--border)] shadow-2xl animate-slide-in">

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] shrink-0"
          style={{ background: `linear-gradient(135deg, ${chapter.glowColor} 0%, transparent 60%)` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{chapter.icon}</span>
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Documentation complète</p>
              <h2 className="text-base font-bold text-white leading-tight">
                Pièce {chapter.id} — {chapter.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)] transition-colors"
            title="Fermer (Échap)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 doc-content">
          {content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-white mt-6 mb-3 pb-2 border-b border-[var(--border)]">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold text-white mt-6 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-purple-300 mt-4 mb-2">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-3 mb-1">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-1 mb-3 ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-1 mb-3 ml-4 list-decimal">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm text-[var(--text-primary)] leading-relaxed flex gap-2">
                    <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                    <span>{children}</span>
                  </li>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ) : (
                    <code>{children}</code>
                  ),
                pre: ({ children }) => (
                  <pre className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed mb-3">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-purple-500 pl-4 py-1 my-3 bg-purple-500/5 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-3">
                    <table className="w-full text-sm border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[var(--bg-card)]">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="text-left text-xs font-semibold text-[var(--text-secondary)] uppercase px-3 py-2 border border-[var(--border)]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="text-[var(--text-primary)] px-3 py-2 border border-[var(--border)]">
                    {children}
                  </td>
                ),
                hr: () => <hr className="border-[var(--border)] my-4" />,
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="text-center py-16 text-[var(--text-secondary)]">
              <BookOpen size={32} className="mx-auto mb-3 opacity-40" />
              <p>Documentation non disponible</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
