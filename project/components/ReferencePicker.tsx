import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, useTheme } from '@/context/ThemeContext';
import { BIBLE_BOOKS } from '@/utils/bibleData';
import { X, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type ReferencePickerProps = {
  isVisible: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  onSelectReference: (bookName: string, chapter: number) => void;
};

export default function ReferencePicker({
  isVisible,
  onClose,
  currentBook,
  currentChapter,
  onSelectReference,
}: ReferencePickerProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'book' | 'chapter'>('book');
  const [selectedBook, setSelectedBook] = useState<string>(currentBook);
  const flatListRef = useRef<FlatList>(null);

  const oldTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'old');
  const newTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'new');

  // Reset to book selection step and set selectedBook when picker opens
  useEffect(() => {
    if (isVisible) {
      setStep('book');
      setSelectedBook(currentBook);
    }
  }, [isVisible, currentBook]);

  const activeBookData = BIBLE_BOOKS.find(b => b.name === selectedBook);
  const totalChapters = activeBookData ? activeBookData.chapters : 0;
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);
  const numColumns = Math.floor((width * 0.85) / 60) || 4; // grid based on modal width

  // Scroll to active chapter when entering chapter selection step
  useEffect(() => {
    if (isVisible && step === 'chapter' && flatListRef.current && selectedBook === currentBook) {
      const index = currentChapter - 1;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          viewPosition: 0.5,
          animated: false,
        });
      }, 100);
    }
  }, [step, isVisible]);

  const handleScrollToIndexFailed = (info: { index: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    }, 100);
  };

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setStep('chapter');
  };

  const handleChapterSelect = (chapter: number) => {
    onSelectReference(selectedBook, chapter);
    onClose();
  };

  const handleBack = () => {
    setStep('book');
  };

  const modalTitle = step === 'book' ? 'Select Book' : `Select Chapter - ${selectedBook}`;

  // Pre-render list of books
  const oldBooksList = oldTestamentBooks.map((book) => {
    const isSelected = selectedBook === book.name;
    const bookColor = isSelected ? colors.primary : colors.text;
    const itemBg = isSelected ? colors.surfaceSelected : 'transparent';
    return (
      <TouchableOpacity
        key={book.name}
        style={[styles.bookItem, { borderBottomColor: colors.border, backgroundColor: itemBg }]}
        onPress={() => handleBookSelect(book.name)}
        accessibilityRole="button"
        accessibilityLabel={`${book.name}, ${book.chapters} chapters`}
        accessibilityState={{ selected: isSelected }}
      >
        <Text style={[styles.bookName, { color: bookColor }]}>{book.name}</Text>
        <Text style={[styles.chapterCount, { color: colors.textSecondary }]}>
          {book.chapters} ch
        </Text>
      </TouchableOpacity>
    );
  });

  const newBooksList = newTestamentBooks.map((book) => {
    const isSelected = selectedBook === book.name;
    const bookColor = isSelected ? colors.primary : colors.text;
    const itemBg = isSelected ? colors.surfaceSelected : 'transparent';
    return (
      <TouchableOpacity
        key={book.name}
        style={[styles.bookItem, { borderBottomColor: colors.border, backgroundColor: itemBg }]}
        onPress={() => handleBookSelect(book.name)}
        accessibilityRole="button"
        accessibilityLabel={`${book.name}, ${book.chapters} chapters`}
        accessibilityState={{ selected: isSelected }}
      >
        <Text style={[styles.bookName, { color: bookColor }]}>{book.name}</Text>
        <Text style={[styles.chapterCount, { color: colors.textSecondary }]}>
          {book.chapters} ch
        </Text>
      </TouchableOpacity>
    );
  });

  const renderChapterItem = ({ item }: { item: number }) => {
    const isSelected = selectedBook === currentBook && currentChapter === item;
    const bg = isSelected ? colors.primary : colors.surfaceMuted;
    const textColor = isSelected ? colors.onPrimary : colors.text;

    return (
      <TouchableOpacity
        style={[styles.chapterItem, { backgroundColor: bg }]}
        onPress={() => handleChapterSelect(item)}
        accessibilityRole="button"
        accessibilityLabel={`Chapter ${item}`}
        accessibilityState={{ selected: isSelected }}
      >
        <Text style={[styles.chapterNumber, { color: textColor }]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const headerLeftControl = step === 'chapter' ? (
    <TouchableOpacity
      onPress={handleBack}
      style={styles.headerButton}
      accessibilityRole="button"
      accessibilityLabel="Go back to book list"
    >
      <ArrowLeft size={24} color={colors.text} />
    </TouchableOpacity>
  ) : null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.modalContainer, { backgroundColor: colors.backgroundSecondary }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <View style={styles.headerLeft}>
              {headerLeftControl}
            </View>
            <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
              {modalTitle}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.headerButton}
              accessibilityRole="button"
              accessibilityLabel="Close picker"
            >
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Body Content */}
          {step === 'book' ? (
            <ScrollView
              style={styles.scrollBody}
              contentContainerStyle={{ paddingBottom: insets.bottom + tokens.spacing[4] }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Old Testament</Text>
              {oldBooksList}
              
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: tokens.spacing[4] }]}>New Testament</Text>
              {newBooksList}
            </ScrollView>
          ) : (
            <FlatList
              ref={flatListRef}
              data={chapters}
              renderItem={renderChapterItem}
              keyExtractor={(item) => item.toString()}
              numColumns={numColumns}
              contentContainerStyle={[styles.gridBody, { paddingBottom: insets.bottom + tokens.spacing[4] }]}
              onScrollToIndexFailed={handleScrollToIndexFailed}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    borderBottomWidth: 1,
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: tokens.fontSize.lg,
    fontFamily: 'Inter-Medium',
    flex: 1,
    textAlign: 'center',
  },
  headerButton: {
    padding: tokens.spacing[2],
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    flex: 1,
    padding: tokens.spacing[4],
  },
  gridBody: {
    padding: tokens.spacing[4],
  },
  sectionTitle: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
    marginBottom: tokens.spacing[2],
    letterSpacing: 1,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: tokens.spacing[3],
    paddingHorizontal: tokens.spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bookName: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Inter-Medium',
  },
  chapterCount: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Inter-Regular',
  },
  chapterItem: {
    flex: 1,
    margin: tokens.spacing[1.5],
    aspectRatio: 1,
    borderRadius: tokens.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 54,
  },
  chapterNumber: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Inter-Medium',
  },
});
