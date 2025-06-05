import { useState, useEffect } from 'react';
import { getBibleData, getChapterVerses } from '@/utils/bibleData';

interface BibleBook {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
}

interface Verse {
  verse: number;
  text: string;
}

interface InitialPosition {
  book?: string;
  chapter?: number;
}

export function useBibleData(initialPosition: InitialPosition = { book: 'Genesis', chapter: 1 }) {
  const [currentBook, setCurrentBook] = useState<string>(initialPosition.book || 'Genesis');
  const [currentChapter, setCurrentChapter] = useState<number>(initialPosition.chapter || 1);
  const [bibleData, setBibleData] = useState<BibleBook[]>([]);
  const [verseData, setVerseData] = useState<Verse[]>([]);
  const [totalChapters, setTotalChapters] = useState<number>(0);

  // Load Bible data on component mount
  useEffect(() => {
    const data = getBibleData();
    setBibleData(data);
  }, []);

  // Update verses when book or chapter changes
  useEffect(() => {
    if (bibleData.length > 0) {
      const bookData = bibleData.find(book => book.name === currentBook);
      if (bookData) {
        setTotalChapters(bookData.chapters);
        const verses = getChapterVerses(currentBook, currentChapter);
        setVerseData(verses);
      }
    }
  }, [bibleData, currentBook, currentChapter]);

  return {
    currentBook,
    currentChapter,
    bibleData,
    verseData,
    totalChapters,
    setCurrentBook,
    setCurrentChapter
  };
}