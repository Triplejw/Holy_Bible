import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useLastPosition } from '@/hooks/useLastPosition';
import SplashScreen from '@/components/SplashScreen';
import { useTheme } from '@/context/ThemeContext';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const { lastPosition } = useLastPosition();
  const { colors } = useTheme();

  const handleSplashFinish = () => {
    setShowSplash(false);
    router.replace('/(tabs)/bible');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
    </View>
  );
} 