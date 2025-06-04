import { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ChapterSelector({
  isVisible,
  onClose,
  totalChapters,
  currentChapter,
  onSelectChapter,
}) {
  const { colors } = useTheme();
  const flatListRef = useRef(null);

  // Generate an array of chapter numbers
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);
  
  // Calculate number of columns based on screen width
  const numColumns = Math.floor(width / 70);

  useEffect(() => {
    if (isVisible && flatListRef.current) {
      const index = currentChapter - 1;
      const viewPosition = 0.5;
      
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          viewPosition,
          animated: false,
        });
      }, 100);
    }
  }, [isVisible, currentChapter]);

  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ 
        index: Math.floor(info.index / numColumns) * numColumns,
        animated: false 
      });
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.chapterItem,
        currentChapter === item && { 
          backgroundColor: colors.primary,
        },
      ]}
      onPress={() => {
        onSelectChapter(item);
      }}
    >
      <Text
        style={[
          styles.chapterNumber,
          { color: currentChapter === item ? 'white' : colors.text },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Chapter</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            ref={flatListRef}
            data={chapters}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.chapterGrid}
            onScrollToIndexFailed={handleScrollToIndexFailed}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  closeButton: {
    padding: 8,
  },
  chapterGrid: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  chapterItem: {
    margin: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  chapterNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});