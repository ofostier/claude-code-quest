import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import PuzzleBoard from './components/PuzzleBoard';
import ChapterView from './components/ChapterView';
import { useProgress } from './hooks/useProgress';
import { getChapter } from './data/chapters';

function ChapterPage({ isUnlocked, isCompleted, completeChapter }) {
  const { slug } = useParams();
  const chapter = getChapter(slug);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-[var(--text-secondary)]">Chapitre introuvable.</p>
      </div>
    );
  }

  if (!isUnlocked(chapter.id)) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-white mb-2">Pièce verrouillée</h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Complète la pièce précédente pour débloquer celle-ci.
        </p>
      </div>
    );
  }

  return (
    <ChapterView
      key={chapter.id}
      chapter={chapter}
      isCompleted={isCompleted(chapter.id)}
      onComplete={completeChapter}
    />
  );
}

export default function App() {
  const { completedCount, totalCount, isUnlocked, isCompleted, completeChapter, resetProgress } =
    useProgress();

  return (
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
        </Routes>
      </main>
    </div>
  );
}
