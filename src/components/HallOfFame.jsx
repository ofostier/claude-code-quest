import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useHallOfFame } from '../hooks/useHallOfFame';

const MEDALS = ['🥇', '🥈', '🥉'];

function EntryRow({ entry, rank, onRemove }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] group">
      <span className="text-xl w-7 text-center shrink-0">
        {rank < 3 ? MEDALS[rank] : (
          <span className="text-sm font-bold text-[var(--text-secondary)] font-mono">
            #{rank + 1}
          </span>
        )}
      </span>

      <span className="flex-1 text-white font-medium truncate">{entry.name}</span>

      <span className="text-xs text-[var(--text-secondary)] shrink-0">
        {new Date(entry.addedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
      </span>

      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)] hover:text-red-400 p-1 rounded"
        aria-label="Supprimer"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

function AddForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd(value)) setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ajouter un nom..."
        maxLength={50}
        className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[var(--accent)] text-white hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
      >
        <Plus size={15} />
        Ajouter
      </button>
    </form>
  );
}

export default function HallOfFame() {
  const navigate = useNavigate();
  const { entries, addEntry, removeEntry } = useHallOfFame();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Retour au puzzle
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center shrink-0">
          <Trophy size={28} className="text-amber-900" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Hall of Fame</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {entries.length === 0
              ? 'Aucun nom pour l\'instant'
              : `${entries.length} membre${entries.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Add form */}
      <div className="mb-6">
        <AddForm onAdd={addEntry} />
      </div>

      {/* Entries list */}
      {entries.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-[var(--border)]">
          <div className="text-4xl mb-3">🏆</div>
          <p className="text-sm text-[var(--text-secondary)]">
            Sois le premier à rejoindre le Hall of Fame.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <EntryRow
              key={`${entry.name}-${entry.addedAt}`}
              entry={entry}
              rank={index}
              onRemove={() => removeEntry(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
