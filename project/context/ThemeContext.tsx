import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
const lightTheme = {
  primary: '#3E64FF',
  primaryLight: '#5A7BFF',
  secondary: '#FFD700',
  secondaryLight: '#FFEB80',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F7FA',
  text: '#1A1A2E',
  textSecondary: '#4A4A68',
  border: '#E1E1E8',
  success: '#38B2AC',
  error: '#E53E3E',
  card: '#FFFFFF',
};

const darkTheme = {
  primary: '#3E64FF',
  primaryLight: '#5A7BFF',
  secondary: '#FFD700',
  secondaryLight: '#FFEB80',
  background: '#1A1A2E',
  backgroundSecondary: '#16213E',
  text: '#F5F7FA',
  textSecondary: '#A0AEC0',
  border: '#2D3748',
  success: '#38B2AC',
  error: '#E53E3E',
  card: '#16213E',
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(colorScheme === 'dark');

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        } else {
          // If no saved preference, use system default
          setIsDark(colorScheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, [colorScheme]);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);