import { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLastPosition } from '@/hooks/useLastPosition';
import BibleReader from '@/components/BibleReader';

export default function BibleTab() {
  const { colors } = useTheme();
  const { lastPosition } = useLastPosition();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BibleReader initialPosition={lastPosition} />
    </View>
  );
} 