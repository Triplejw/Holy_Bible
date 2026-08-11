import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import BibleReader from '@/components/BibleReader';

export default function BibleTab() {
  const { colors } = useTheme();
  const { lastPosition } = useLastPosition();
  const { testament, at } = useLocalSearchParams<{ testament?: string; at?: string }>();

  const browseRequest = testament ? { testament, at } : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BibleReader initialPosition={lastPosition} browseRequest={browseRequest} />
    </View>
  );
}
