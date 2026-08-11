import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react-native';
import { BIBLE_BOOKS } from '@/utils/bibleData';

export default function BookDrawer({ onBookSelect, currentBook, onClose }) {
  const { colors } = useTheme();
  const [activeTestament, setActiveTestament] = useState('old');

  const oldTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'old');
  const newTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'new');

  const testamentBooks = activeTestament === 'old' ? oldTestamentBooks : newTestamentBooks;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Holy Bible</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabContainer, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTestament === 'old' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTestament('old')}
        >
          <Text style={[styles.tabText, { color: activeTestament === 'old' ? colors.primary : colors.textSecondary }]}>
            Old Testament
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTestament === 'new' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTestament('new')}
        >
          <Text style={[styles.tabText, { color: activeTestament === 'new' ? colors.primary : colors.textSecondary }]}>
            New Testament
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.bookList}>
        {testamentBooks.map((book) => {
          const isSelected = currentBook === book.name;

          return (
            <TouchableOpacity
              key={book.name}
              style={[
                styles.bookItem,
                { borderBottomColor: colors.border },
                isSelected && { backgroundColor: colors.surfaceSelected }
              ]}
              onPress={() => onBookSelect(book.name)}
            >
              <Text 
                style={[
                  styles.bookName,
                  { color: colors.text },
                  isSelected && { color: colors.primary, fontFamily: 'Inter-Medium' }
                ]}
              >
                {book.name}
              </Text>
              <Text style={[styles.chapterCount, { color: colors.textSecondary }]}>
                {book.chapters} chapters
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  closeButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  bookList: {
    flex: 1,
  },
  bookItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  bookName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  chapterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});