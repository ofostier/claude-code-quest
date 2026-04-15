import { CHAPTERS_BASE } from './chaptersBase';
import { CHAPTERS_CONTENT_FR } from './chapters.fr';
import { CHAPTERS_CONTENT_EN } from './chapters.en';

export function getChapters(lang = 'fr') {
  const content = lang === 'en' ? CHAPTERS_CONTENT_EN : CHAPTERS_CONTENT_FR;
  return CHAPTERS_BASE.map((base) => ({ ...base, ...content[base.id] }));
}

export function getChapter(slug, lang = 'fr') {
  return getChapters(lang).find((c) => c.slug === slug);
}

export function getNextChapter(id, lang = 'fr') {
  return getChapters(lang).find((c) => c.id === id + 1) || null;
}

// Backward compatibility (used in tests / commands)
export const CHAPTERS = getChapters('fr');
