import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useBibleData } from '@/hooks/useBibleData';
import { useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import BookDrawer from '@/components/BookDrawer';
import ChapterSelector from '@/components/ChapterSelector';
import SummaryModal from '@/components/SummaryModal';
import { Book as BookIcon, Menu, BookOpen, ArrowLeft, ArrowRight, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface InitialPosition {
  book?: string;
  chapter?: number;
}

interface BibleReaderProps {
  initialPosition?: InitialPosition;
}

export default function BibleReader({ initialPosition }: BibleReaderProps) {
  const { colors } = useTheme();
  const { 
    currentBook, 
    currentChapter, 
    bibleData, 
    verseData, 
    totalChapters,
    setCurrentBook, 
    setCurrentChapter 
  } = useBibleData(initialPosition);
  const { saveLastPosition } = useLastPosition();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChapterSelectorOpen, setIsChapterSelectorOpen] = useState(false);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (verseData.length > 0) {
      saveLastPosition(currentBook, currentChapter);
    }
  }, [currentBook, currentChapter, verseData]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    Animated.timing(drawerAnimation, {
      toValue: isDrawerOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.7, 0],
  });

  const handleBookSelect = (bookName: string) => {
    setCurrentBook(bookName);
    setCurrentChapter(1);
    setIsDrawerOpen(false);
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleChapterSelect = (chapter: number) => {
    setCurrentChapter(chapter);
    setIsChapterSelectorOpen(false);
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.headerButton}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <TouchableOpacity 
            onPress={() => setIsChapterSelectorOpen(true)}
            style={styles.chapterSelector}
          >
            <BookOpen size={20} color={colors.primary} style={styles.chapterIcon} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {currentBook} {currentChapter}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.summaryButton}
            onPress={() => setSummaryModalVisible(true)}
          >
            <Info size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bible Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {verseData.map((verse) => (
          <View key={verse.verse} style={styles.verseContainer}>
            <Text style={[styles.verseNumber, { color: colors.primary }]}>
              {verse.verse + 1}
            </Text>
            <Text style={[styles.verseText, { color: colors.text }]}>{verse.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={[styles.navigationBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          onPress={navigateToPreviousChapter}
          style={[
            styles.navButton,
            currentChapter === 1 && styles.navButtonDisabled
          ]}
          disabled={currentChapter === 1}
        >
          <ArrowLeft size={24} color={currentChapter === 1 ? colors.textSecondary : colors.primary} />
        </TouchableOpacity>

        <View style={styles.chapterIndicator}>
          <Text style={[styles.chapterText, { color: colors.text }]}>
            Chapter {currentChapter} of {totalChapters}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={navigateToNextChapter}
          style={[
            styles.navButton,
            currentChapter === totalChapters && styles.navButtonDisabled
          ]}
          disabled={currentChapter === totalChapters}
        >
          <ArrowRight size={24} color={currentChapter === totalChapters ? colors.textSecondary : colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Book Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: drawerTranslateX }], backgroundColor: colors.backgroundSecondary }
        ]}
      >
        <BookDrawer 
          onBookSelect={handleBookSelect} 
          currentBook={currentBook}
          onClose={toggleDrawer}
        />
      </Animated.View>

      {/* Backdrop */}
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={toggleDrawer}
          activeOpacity={1}
        />
      )}

      {/* Modals */}
      <ChapterSelector
        isVisible={isChapterSelectorOpen}
        onClose={() => setIsChapterSelectorOpen(false)}
        totalChapters={totalChapters}
        currentChapter={currentChapter}
        onSelectChapter={handleChapterSelect}
      />

      <SummaryModal
        isVisible={summaryModalVisible}
        onClose={() => setSummaryModalVisible(false)}
        book={currentBook}
        chapter={currentChapter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E8',
  },
  headerButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  chapterSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  chapterIcon: {
    marginRight: 8,
  },
  summaryButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 8,
    minWidth: 24,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  chapterIndicator: {
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '70%',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});