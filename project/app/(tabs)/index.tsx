import { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, Search, Sunrise, Library, Scroll } from 'lucide-react-native';
import { tokens, useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import { getVerseOfTheDay } from '@/utils/verseOfTheDay';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { lastPosition } = useLastPosition();
  // Fixed for the calendar day, and a chapter lookup — not per render.
  const dailyVerse = useMemo(() => getVerseOfTheDay(), []);

  const resumeSubtitle = `${lastPosition.book} ${lastPosition.chapter}`;
  const verseReference = dailyVerse
    ? `${dailyVerse.book} ${dailyVerse.chapter}:${dailyVerse.verse}`
    : 'Unavailable';

  const openReader = () => router.push('/(tabs)/bible');
  const openSearch = () => router.push('/(tabs)/search');

  return (
    <PageLayout>
      <Card
        title="Verse of the day"
        icon={<Sunrise size={24} color={colors.onPrimary} />}
        onPress={openReader}
        emphasis
      >
        <Text style={[styles.verseText, { color: colors.onPrimary }]}>{dailyVerse?.text}</Text>
        <Text style={[styles.verseReference, { color: colors.onPrimary }]}>{verseReference}</Text>
      </Card>

      <Card
        title="Search"
        subtitle="Find a verse by its words"
        icon={<Search size={24} color={colors.primary} />}
        onPress={openSearch}
      />

      <Card
        title="Continue"
        subtitle={resumeSubtitle}
        icon={<BookOpen size={20} color={colors.primary} />}
        onPress={openReader}
        compact
      />

      <View style={styles.testaments}>
        <View style={styles.testamentCard}>
          <Card
            title="Old Testament"
            subtitle="39 books"
            icon={<Scroll size={24} color={colors.primary} />}
            onPress={openReader}
          />
        </View>
        <View style={styles.testamentCard}>
          <Card
            title="New Testament"
            subtitle="27 books"
            icon={<Library size={24} color={colors.primary} />}
            onPress={openReader}
          />
        </View>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  verseText: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Inter-Regular',
    lineHeight: tokens.fontSize.md * tokens.lineHeight.relaxed,
    marginTop: tokens.spacing[2],
  },
  verseReference: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Inter-Medium',
    marginTop: tokens.spacing[2],
  },
  testaments: {
    flexDirection: 'row',
    gap: tokens.spacing[3],
  },
  testamentCard: {
    flex: 1,
  },
});
