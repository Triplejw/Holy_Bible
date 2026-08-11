import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReaderIntentProvider } from '@/context/ReaderIntentContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ReaderIntentProvider>
            <RootLayout fontsLoaded={fontsLoaded} />
          </ReaderIntentProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootLayout({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { colors, isDark, isReady } = useTheme();

  // Both gates, or a dark-mode user gets a light frame before the saved
  // preference resolves.
  const canPaint = fontsLoaded && isReady;

  useEffect(() => {
    if (canPaint) {
      SplashScreen.hideAsync();
    }
  }, [canPaint]);

  const statusBarStyle = isDark ? 'light' : 'dark';

  if (!canPaint) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={statusBarStyle} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: '',
          }}
        />
      </Stack>
    </View>
  );
}