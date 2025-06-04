import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

type Position = {
  book: string;
  chapter: number;
};

export const useLastPosition = () => {
  const [lastPosition, setLastPosition] = useState<Position>({ book: 'Genesis', chapter: 1 });

  useEffect(() => {
    loadLastPosition();
  }, []);

  const loadLastPosition = async () => {
    try {
      const savedPosition = await AsyncStorage.getItem('lastPosition');
      if (savedPosition) {
        setLastPosition(JSON.parse(savedPosition));
      }
    } catch (error) {
      console.error('Error loading last position:', error);
    }
  };

  const saveLastPosition = async (book: string, chapter: number) => {
    try {
      const position = { book, chapter };
      await AsyncStorage.setItem('lastPosition', JSON.stringify(position));
      setLastPosition(position);
    } catch (error) {
      console.error('Error saving last position:', error);
    }
  };

  return {
    lastPosition,
    saveLastPosition,
  };
};