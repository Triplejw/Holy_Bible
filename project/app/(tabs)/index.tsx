import { StyleSheet, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingHorizontal: tokens.spacing[6],
        paddingTop: insets.top + tokens.spacing[6],
        paddingBottom: insets.bottom + tokens.spacing[6],
      }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.text }]}>Home</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: tokens.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
  },
});
