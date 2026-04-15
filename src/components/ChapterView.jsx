import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Zap, CheckSquare, Eye } from 'lucide-react';
import { getNextChapter } from '../data/chapters';
import { useLang } from '../i18n/LangContext';
import DocPanel from './DocPanel';

export default function ChapterView({ chapter, isCompleted, onComplete }) {
  const [tab, setTab] = useState('theory');
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [exampleTab, setExampleTab] = useState('basic');
  const [showSolution, setShowSolution] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const next = getNextChapter(chapter.id, lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleStep = (idx) => {
    setCheckedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const allStepsChecked = checkedSteps.length === chapter.challenge.validation.length;

  const handleComplete = () => {
    onComplete(chapter.id);
    if (next) navigate(`/chapter/${next.slug}`);
    else navigate('/');
  };

  const tabs = [
    { id: 'theory', label: t.chapterView.tabTheory, icon: BookOpen },
    { id: 'challenge', label: t.chapterView.tabChallenge, icon: Zap },
  ];

  const docPath = t.chapterView.docPath(lang, chapter.id, chapter.slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Back nav */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        {t.chapterView.back}
      </button>

      {/* Chapter header */}
      <div
        className="rounded-xl p-6 mb-6 border"
        style={{
          borderColor: chapter.borderColor,
          background: `linear-gradient(135deg, ${chapter.glowColor} 0%, transparent 60%)`,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="text-5xl">{chapter.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                {t.chapterView.pieceLabel} {chapter.id}{t.chapterView.of}
              </span>
              {isCompleted && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {t.chapterView.completed}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{chapter.title}</h1>
            <p className="text-[var(--text-secondary)] text-sm">{chapter.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[var(--border)] pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all',
              tab === id
                ? 'tab-active border-purple-500/50'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
            ].join(' ')}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Theory tab */}
      {tab === 'theory' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {chapter.theory.summary}
            </p>
          </div>

          {/* Key points */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              {t.chapterView.keyPoints}
            </h3>
            <ul className="space-y-2">
              {chapter.theory.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                  <span className="text-purple-400 mt-0.5">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code example */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              {t.chapterView.example}
            </h3>
            {chapter.theory.codeExamples ? (
              <div>
                <div className="flex gap-1 mb-2">
                  {[
                    { id: 'basic', label: t.chapterView.exampleSimple },
                    { id: 'advanced', label: t.chapterView.exampleAdvanced },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setExampleTab(id)}
                      className={[
                        'px-3 py-1 rounded-md text-xs font-medium border transition-all',
                        exampleTab === id
                          ? 'bg-purple-500/20 border-purple-500/50 text-[var(--accent)]'
                          : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="code-block p-4">
                  <pre className="text-sm text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
                    {chapter.theory.codeExamples[exampleTab]}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="code-block p-4">
                <pre className="text-sm text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
                  {chapter.theory.codeExample}
                </pre>
              </div>
            )}
          </div>

          {/* Doc link */}
          <button
            onClick={() => setShowDoc(true)}
            className="w-full flex items-center gap-3 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-purple-500/40 transition-colors group"
          >
            <BookOpen size={16} className="text-purple-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                {t.chapterView.docTitle}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono">{docPath}</p>
            </div>
            <span className="ml-auto text-xs text-[var(--text-secondary)] group-hover:text-purple-400 transition-colors">
              {t.chapterView.docOpen}
            </span>
          </button>

          <button
            onClick={() => setTab('challenge')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
          >
            <Zap size={16} />
            {t.chapterView.goToChallenge}
          </button>
        </div>
      )}

      {/* Challenge tab */}
      {tab === 'challenge' && (
        <div className="space-y-6">
          {/* Objective */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-2">
              <span className="text-amber-500">🎯</span>
              <div>
                <p className="text-sm font-semibold text-amber-600 mb-1">
                  {t.chapterView.objective}
                </p>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {chapter.challenge.objective}
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              {t.chapterView.steps}
            </h3>
            <ol className="space-y-3">
              {chapter.challenge.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="step-number">{i + 1}</div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Hint */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="flex items-start gap-2">
              <span>💡</span>
              <div>
                <p className="text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  {t.chapterView.hintLabel}{' '}
                  <code className="text-purple-400">/hint</code>{' '}
                  {t.chapterView.hintSuffix}
                </p>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {chapter.challenge.hint}
                </p>
              </div>
            </div>
          </div>

          {/* Doc link */}
          <button
            onClick={() => setShowDoc(true)}
            className="w-full flex items-center gap-3 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-purple-500/40 transition-colors group"
          >
            <BookOpen size={16} className="text-purple-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                {t.chapterView.docTitle}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono">{docPath}</p>
            </div>
            <span className="ml-auto text-xs text-[var(--text-secondary)] group-hover:text-purple-400 transition-colors">
              {t.chapterView.docOpen}
            </span>
          </button>

          {/* Solution */}
          {chapter.challenge.solution && (
            <div>
              {!showSolution ? (
                <button
                  onClick={() => setShowSolution(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-purple-500/40 transition-all"
                >
                  <Eye size={14} />
                  {t.chapterView.showSolution}
                </button>
              ) : (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-amber-500/20">
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <Eye size={12} /> {t.chapterView.solution}
                    </span>
                    <button
                      onClick={() => setShowSolution(false)}
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {t.chapterView.hideSolution}
                    </button>
                  </div>
                  <div className="p-4 code-block rounded-none border-0">
                    <pre className="text-sm text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
                      {chapter.challenge.solution}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Validation checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t.chapterView.selfEval}
              </h3>
              <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                {t.chapterView.honor}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
              {t.chapterView.evalDesc1}
              <strong className="text-[var(--text-primary)]">{t.chapterView.evalDescBold}</strong>
              {t.chapterView.evalDesc2}
              <code className="text-purple-400">/validate</code>.
            </p>
            <div className="space-y-2">
              {chapter.challenge.validation.map((criterion, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={[
                    'w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all',
                    checkedSteps.includes(i)
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-purple-500/30',
                  ].join(' ')}
                >
                  <CheckSquare
                    size={16}
                    className={checkedSteps.includes(i) ? 'text-emerald-400' : 'text-[var(--text-secondary)]'}
                  />
                  {criterion}
                </button>
              ))}
            </div>
          </div>

          {/* Complete button */}
          <button
            onClick={handleComplete}
            disabled={!allStepsChecked && !isCompleted}
            className={[
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all',
              allStepsChecked || isCompleted
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
                : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] cursor-not-allowed',
            ].join(' ')}
          >
            {isCompleted ? (
              <>
                <ArrowRight size={16} />
                {next
                  ? `${t.chapterView.nextPiece} ${next.title}`
                  : t.chapterView.backToPuzzle}
              </>
            ) : (
              <>
                <CheckSquare size={16} />
                {allStepsChecked
                  ? `${t.chapterView.confirmLabel} ${chapter.id}`
                  : `${t.chapterView.checkCriteria} (${checkedSteps.length}/${chapter.challenge.validation.length})`}
              </>
            )}
          </button>

          <p className="text-center text-xs text-[var(--text-secondary)]">
            {t.chapterView.validateHint}{' '}
            <code className="text-purple-400">/validate</code>{' '}
            {t.chapterView.validateHintMiddle}{' '}
            {t.chapterView.validateHintSuffix}
          </p>
        </div>
      )}

      {/* Doc panel */}
      {showDoc && (
        <DocPanel chapter={chapter} onClose={() => setShowDoc(false)} />
      )}
    </div>
  );
}
