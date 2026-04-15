import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

// This component is built by the user during Chapter 7 (Master Build)
export default function HallOfFamePlaceholder() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-10 transition-colors"
      >
        <ArrowLeft size={14} />
        {t.hallOfFame.back}
      </button>

      <div className="p-10 rounded-2xl border-2 border-dashed border-amber-500/30 bg-amber-500/5">
        <Trophy size={48} className="mx-auto mb-4 text-amber-400/50" />
        <h1 className="text-2xl font-bold text-amber-500/70 mb-3">
          {t.hallOfFame.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto leading-relaxed">
          {t.hallOfFame.desc}{' '}
          <strong className="text-[var(--text-primary)]">{t.hallOfFame.descStrong}</strong>.
          <br /><br />
          {t.hallOfFame.instructions}
        </p>
      </div>
    </div>
  );
}
