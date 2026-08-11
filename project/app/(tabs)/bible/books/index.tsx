import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { tokens, useTheme } from '@/context/ThemeContext';
import { BIBLE_BOOKS } from '@/utils/bibleData';

export default function BooksScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { testament } = useLocalSearchParams<{ testament?: string }>();

  const books = testament
    ? BIBLE_BOOKS.filter((book) => book.testament === testament)
    : BIBLE_BOOKS;

  const openBook = (name: string) =>
    router.push({ pathname: '/(tabs)/bible/books/[book]', params: { book: name } });

  const title =
    testament === 'old'
      ? 'Old Testament'
      : testament === 'new'
        ? 'New Testament'
        : 'Books';

  return (
    <>
      <Stack.Screen options={{ title }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingTop: tokens.spacing[2],
          paddingBottom: insets.bottom + tokens.spacing[6],
        }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {books.map((book) => (
          <TouchableOpacity
            key={book.name}
            onPress={() => openBook(book.name)}
            style={[styles.row, { borderBottomColor: colors.border }]}
            accessibilityRole="button"
            accessibilityLabel={`${book.name}, ${book.chapters} chapters`}
          >
            <View style={styles.rowText}>
              <Text style={[styles.bookName, { color: colors.text }]}>
                {book.name}
              </Text>
              <Text
                style={[styles.chapterCount, { color: colors.textSecondary }]}
              >
                {book.chapters} chapters
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing[3],
    paddingHorizontal: tokens.spacing[5],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
  },
  bookName: {
    fontSize: tokens.fontSize.lg,
    fontFamily: 'Inter-Medium',
  },
  chapterCount: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Inter-Regular',
    marginTop: tokens.spacing[0.5],
  },
});
