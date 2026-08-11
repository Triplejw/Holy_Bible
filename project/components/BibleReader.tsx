import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBibleData } from '@/hooks/useBibleData';
import { tokens, useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import BookDrawer from '@/components/BookDrawer';
import ChapterSelector from '@/components/ChapterSelector';
import SummaryModal from '@/components/SummaryModal';
import { Menu, BookOpen, ArrowLeft, ArrowRight, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function BibleReader({ initialPosition }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
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
  const scrollViewRef = useRef(null);
  
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

  const handleBookSelect = (bookName) => {
    setCurrentBook(bookName);
    setCurrentChapter(1);
    setIsDrawerOpen(false);
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleChapterSelect = (chapter) => {
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

  const prevArrowColor = currentChapter === 1 ? colors.textSecondary : colors.primary;
  const nextArrowColor = currentChapter === totalChapters ? colors.textSecondary : colors.primary;
  
  const headerText = `${currentBook} ${currentChapter}`;
  const indicatorText = `Chapter ${currentChapter} of ${totalChapters}`;

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
              {headerText}
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
        contentContainerStyle={[styles.scrollViewContent, { paddingBottom: insets.bottom + tokens.spacing[4] }]}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {verseData.map((verse) => (
          <View key={verse.verse} style={styles.verseContainer}>
            <Text style={[styles.verseNumber, { color: colors.primary }]}>{verse.verse}</Text>
            <Text style={[styles.verseText, { color: colors.text }]}>{verse.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Bar */}
      <View
        style={[
          styles.navigationBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + tokens.spacing[3],
          }
        ]}
      >
        <TouchableOpacity 
          onPress={navigateToPreviousChapter}
          style={[styles.navButton, currentChapter === 1 && styles.navButtonDisabled]}
          disabled={currentChapter === 1}
        >
          <ArrowLeft size={24} color={prevArrowColor} />
        </TouchableOpacity>

        <View style={styles.chapterIndicator}>
          <Text style={[styles.chapterText, { color: colors.text }]}>
            {indicatorText}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={navigateToNextChapter}
          style={[styles.navButton, currentChapter === totalChapters && styles.navButtonDisabled]}
          disabled={currentChapter === totalChapters}
        >
          <ArrowRight size={24} color={nextArrowColor} />
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
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
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
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: tokens.spacing[2],
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: tokens.spacing[2],
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
  verseContainer: {
    flexDirection: 'row',
    marginBottom: tokens.spacing[3],
  },
  verseNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: tokens.spacing[2],
    minWidth: tokens.spacing[6],
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 16 * tokens.lineHeight.normal,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing[4],
    paddingTop: tokens.spacing[3],
    borderTopWidth: 1,
  },
  navButton: {
    padding: tokens.spacing[2],
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
    zIndex: 999,
  },
});