import { useState, useEffect } from 'react';
import { getBibleData, getChapterVerses } from '@/utils/bibleData';

export function useBibleData(initialPosition = { book: 'Genesis', chapter: 1 }) {
  const [currentBook, setCurrentBook] = useState(initialPosition.book || 'Genesis');
  const [currentChapter, setCurrentChapter] = useState(initialPosition.chapter || 1);
  const [bibleData, setBibleData] = useState([]);
  const [verseData, setVerseData] = useState([]);
  const [totalChapters, setTotalChapters] = useState(0);

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