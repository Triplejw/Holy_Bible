// This is a simplified version of Bible data for demonstration purposes
// In a real app, this would be a comprehensive dataset or connect to a Bible API

// List of books with chapter counts
export const BIBLE_BOOKS = [
  // Old Testament
  { name: 'Genesis', chapters: 50, testament: 'old' },
  { name: 'Exodus', chapters: 40, testament: 'old' },
  { name: 'Leviticus', chapters: 27, testament: 'old' },
  { name: 'Numbers', chapters: 36, testament: 'old' },
  { name: 'Deuteronomy', chapters: 34, testament: 'old' },
  { name: 'Joshua', chapters: 24, testament: 'old' },
  { name: 'Judges', chapters: 21, testament: 'old' },
  { name: 'Ruth', chapters: 4, testament: 'old' },
  { name: '1 Samuel', chapters: 31, testament: 'old' },
  { name: '2 Samuel', chapters: 24, testament: 'old' },
  { name: '1 Kings', chapters: 22, testament: 'old' },
  { name: '2 Kings', chapters: 25, testament: 'old' },
  { name: '1 Chronicles', chapters: 29, testament: 'old' },
  { name: '2 Chronicles', chapters: 36, testament: 'old' },
  { name: 'Ezra', chapters: 10, testament: 'old' },
  { name: 'Nehemiah', chapters: 13, testament: 'old' },
  { name: 'Esther', chapters: 10, testament: 'old' },
  { name: 'Job', chapters: 42, testament: 'old' },
  { name: 'Psalms', chapters: 150, testament: 'old' },
  { name: 'Proverbs', chapters: 31, testament: 'old' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'old' },
  { name: 'Song of Solomon', chapters: 8, testament: 'old' },
  { name: 'Isaiah', chapters: 66, testament: 'old' },
  { name: 'Jeremiah', chapters: 52, testament: 'old' },
  { name: 'Lamentations', chapters: 5, testament: 'old' },
  { name: 'Ezekiel', chapters: 48, testament: 'old' },
  { name: 'Daniel', chapters: 12, testament: 'old' },
  { name: 'Hosea', chapters: 14, testament: 'old' },
  { name: 'Joel', chapters: 3, testament: 'old' },
  { name: 'Amos', chapters: 9, testament: 'old' },
  { name: 'Obadiah', chapters: 1, testament: 'old' },
  { name: 'Jonah', chapters: 4, testament: 'old' },
  { name: 'Micah', chapters: 7, testament: 'old' },
  { name: 'Nahum', chapters: 3, testament: 'old' },
  { name: 'Habakkuk', chapters: 3, testament: 'old' },
  { name: 'Zephaniah', chapters: 3, testament: 'old' },
  { name: 'Haggai', chapters: 2, testament: 'old' },
  { name: 'Zechariah', chapters: 14, testament: 'old' },
  { name: 'Malachi', chapters: 4, testament: 'old' },
  
  // New Testament
  { name: 'Matthew', chapters: 28, testament: 'new' },
  { name: 'Mark', chapters: 16, testament: 'new' },
  { name: 'Luke', chapters: 24, testament: 'new' },
  { name: 'John', chapters: 21, testament: 'new' },
  { name: 'Acts', chapters: 28, testament: 'new' },
  { name: 'Romans', chapters: 16, testament: 'new' },
  { name: '1 Corinthians', chapters: 16, testament: 'new' },
  { name: '2 Corinthians', chapters: 13, testament: 'new' },
  { name: 'Galatians', chapters: 6, testament: 'new' },
  { name: 'Ephesians', chapters: 6, testament: 'new' },
  { name: 'Philippians', chapters: 4, testament: 'new' },
  { name: 'Colossians', chapters: 4, testament: 'new' },
  { name: '1 Thessalonians', chapters: 5, testament: 'new' },
  { name: '2 Thessalonians', chapters: 3, testament: 'new' },
  { name: '1 Timothy', chapters: 6, testament: 'new' },
  { name: '2 Timothy', chapters: 4, testament: 'new' },
  { name: 'Titus', chapters: 3, testament: 'new' },
  { name: 'Philemon', chapters: 1, testament: 'new' },
  { name: 'Hebrews', chapters: 13, testament: 'new' },
  { name: 'James', chapters: 5, testament: 'new' },
  { name: '1 Peter', chapters: 5, testament: 'new' },
  { name: '2 Peter', chapters: 3, testament: 'new' },
  { name: '1 John', chapters: 5, testament: 'new' },
  { name: '2 John', chapters: 1, testament: 'new' },
  { name: '3 John', chapters: 1, testament: 'new' },
  { name: 'Jude', chapters: 1, testament: 'new' },
  { name: 'Revelation', chapters: 22, testament: 'new' },
];

// Sample verse content for Genesis 1 (simplified)
const SAMPLE_VERSES = {
  'Genesis': {
    1: [
      { verse: 1, text: 'In the beginning God created the heavens and the earth.' },
      { verse: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
      { verse: 3, text: 'And God said, "Let there be light," and there was light.' },
      { verse: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
      { verse: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.' },
    ],
    2: [
      { verse: 1, text: 'Thus the heavens and the earth were completed in all their vast array.' },
      { verse: 2, text: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.' },
      { verse: 3, text: 'Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done.' },
    ],
  },
  'Psalms': {
    23: [
      { verse: 1, text: 'The Lord is my shepherd, I lack nothing.' },
      { verse: 2, text: 'He makes me lie down in green pastures, he leads me beside quiet waters,' },
      { verse: 3, text: 'he refreshes my soul. He guides me along the right paths for his name\'s sake.' },
      { verse: 4, text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
      { verse: 5, text: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.' },
      { verse: 6, text: 'Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.' },
    ],
  },
};

// Generate mock verse data for a given book and chapter
function generateMockVerses(book, chapter, numVerses = 30) {
  const verses = [];
  for (let i = 1; i <= numVerses; i++) {
    verses.push({
      verse: i,
      text: `This is verse ${i} of ${book} chapter ${chapter}. This is placeholder text to simulate Bible content. In a real app, this would contain the actual scripture text from a Bible database or API.`,
    });
  }
  return verses;
}

// Get all Bible book data
export function getBibleData() {
  return BIBLE_BOOKS;
}

// Get verses for a specific chapter
export function getChapterVerses(book, chapter) {
  // Check if we have sample verses for this book and chapter
  if (SAMPLE_VERSES[book] && SAMPLE_VERSES[book][chapter]) {
    return SAMPLE_VERSES[book][chapter];
  }

  // If not in our sample data, generate placeholder verses
  // Get the book data to know how many verses to generate
  const bookData = BIBLE_BOOKS.find(b => b.name === book);
  if (!bookData) return [];

  // Use a consistent number of verses based on chapter number
  const versesCount = 20 + (chapter % 10); // Between 20-29 verses
  
  return generateMockVerses(book, chapter, versesCount);
}