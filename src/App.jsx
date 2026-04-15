import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import PuzzleBoard from './components/PuzzleBoard';
import ChapterView from './components/ChapterView';
import HallOfFamePlaceholder from './components/HallOfFamePlaceholder';
import { useProgress } from './hooks/useProgress';
import { useLanguage } from './hooks/useLanguage';
import { getChapter } from './data/chapters';
import { LangContext, useLang } from './i18n/LangContext';
import uiFR from './i18n/ui.fr';
import uiEN from './i18n/ui.en';

function ChapterPage({ isUnlocked, isCompleted, completeChapter }) {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const chapter = getChapter(slug, lang);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-[var(--text-secondary)]">{t.app.notFound}</p>
      </div>
    );
  }

  if (!isUnlocked(chapter.id)) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t.app.locked}</h2>
        <p className="text-[var(--text-secondary)] text-sm">{t.app.lockedDesc}</p>
      </div>
    );
  }

  return (
    <ChapterView
      key={`${chapter.id}-${lang}`}
      chapter={chapter}
      isCompleted={isCompleted(chapter.id)}
      onComplete={completeChapter}
    />
  );
}

export default function App() {
  const { completedCount, totalCount, isUnlocked, isCompleted, completeChapter, resetProgress } =
    useProgress();
  const { lang, toggleLang } = useLanguage();
  const t = lang === 'en' ? uiEN : uiFR;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Header completedCount={completedCount} totalCount={totalCount} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <PuzzleBoard
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  completedCount={completedCount}
                  resetProgress={resetProgress}
                />
              }
            />
            <Route
              path="/chapter/:slug"
              element={
                <ChapterPage
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  completeChapter={completeChapter}
                />
              }
            />
            <Route path="/hall-of-fame" element={<HallOfFamePlaceholder />} />
          </Routes>
        </main>
      </div>
    </LangContext.Provider>
  );
}
