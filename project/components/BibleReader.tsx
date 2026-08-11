import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import { useBibleData } from '@/hooks/useBibleData';
import { tokens, useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import { useReadingPreferences } from '@/hooks/useReadingPreferences';
import ReferencePicker from '@/components/ReferencePicker';
import SummaryModal from '@/components/SummaryModal';
import { Info, BookOpen } from 'lucide-react-native';

export default function BibleReader({ initialPosition, browseRequest }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { 
    currentBook, 
    currentChapter, 
    verseData, 
    totalChapters,
    setCurrentBook, 
    setCurrentChapter 
  } = useBibleData(initialPosition);
  const { saveLastPosition } = useLastPosition();
  const { fontSize, lineHeight } = useReadingPreferences();
  
  const [isReferencePickerOpen, setIsReferencePickerOpen] = useState(false);
  const [pickerTestament, setPickerTestament] = useState(undefined);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    if (verseData.length > 0) {
      saveLastPosition(currentBook, currentChapter);
    }
  }, [currentBook, currentChapter, verseData]);

  const handleSelectReference = (bookName: string, chapter: number) => {
    setCurrentBook(bookName);
    setCurrentChapter(chapter);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };

  const navigateToPreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  const navigateToNextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  // Arriving from a testament card on the home screen opens the picker on
  // that testament. The request carries a timestamp so tapping the same card
  // twice still counts as a new request.
  useEffect(() => {
    if (!browseRequest?.testament) return;
    setPickerTestament(browseRequest.testament);
    setIsReferencePickerOpen(true);
  }, [browseRequest?.testament, browseRequest?.at]);

  const openReferencePicker = () => {
    setPickerTestament(undefined);
    setIsReferencePickerOpen(true);
  };

  // runOnJS, because a gesture callback is a worklet on the UI thread by
  // default and these handlers set React state.
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .runOnJS(true)
    .onStart(navigateToNextChapter);

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .runOnJS(true)
    .onStart(navigateToPreviousChapter);

  const gesture = Gesture.Race(flingLeft, flingRight);
  const headerText = `${currentBook} ${currentChapter}`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            paddingTop: insets.top + tokens.spacing[3],
          }
        ]}
      >
        <TouchableOpacity 
          onPress={openReferencePicker}
          style={styles.referenceButton}
          accessibilityRole="button"
          accessibilityLabel={`Current reference: ${headerText}. Tap to change book or chapter.`}
        >
          <BookOpen size={20} color={colors.primary} style={styles.chapterIcon} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {headerText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.summaryButton}
          onPress={() => setSummaryModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="View chapter summary"
        >
          <Info size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Bible Content */}
      <GestureDetector gesture={gesture}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollViewContent, { paddingBottom: insets.bottom + tokens.spacing[4] }]}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          {/* One paragraph per verse: numbers stay inline, but a chapter does
              not collapse into an unbroken wall of text. A long-press handler
              attaches to the verse Text below. */}
          {verseData.map((verse) => (
            <Text
              key={verse.verse}
              style={[styles.verseParagraph, { fontSize, lineHeight, color: colors.text }]}
            >
              <Text style={[styles.verseNumberInline, { color: colors.primary }]}>
                {verse.verse}
              </Text>
              {'  '}
              {verse.text}
            </Text>
          ))}
        </ScrollView>
      </GestureDetector>

      {/* Unified Reference Picker Sheet */}
      <ReferencePicker
        isVisible={isReferencePickerOpen}
        onClose={() => setIsReferencePickerOpen(false)}
        currentBook={currentBook}
        currentChapter={currentChapter}
        onSelectReference={handleSelectReference}
        testament={pickerTestament}
      />

      {/* Summary Modal */}
      <SummaryModal
        isVisible={summaryModalVisible}
        onClose={() => setSummaryModalVisible(false)}
        book={currentBook}
        chapter={currentChapter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    borderBottomWidth: 1,
  },
  referenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  chapterIcon: {
    marginRight: tokens.spacing[2],
  },
  summaryButton: {
    padding: tokens.spacing[2],
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: tokens.spacing[4],
  },
  verseParagraph: {
    fontFamily: 'Inter-Regular',
    marginBottom: tokens.spacing[3],
  },
  verseNumberInline: {
    fontFamily: 'Inter-Medium',
  },
});