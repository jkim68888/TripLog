import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const headerTintColor = useThemeColor('text');

  const [loaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // 폰트 로딩이 완료되면 스플래시 스크린 숨기기
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // 스플래시 스크린이 계속 보여짐
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(pages)/addPost"
          options={{
            title: '여행 추가하기',
            headerBackTitle: 'back',
            headerTintColor: headerTintColor,
            headerTitleStyle: { fontFamily: 'Pretendard-SemiBold' },
          }}
        />
        <Stack.Screen
          name="(pages)/addMetaData"
          options={{
            title: '여행 추가하기',
            headerBackTitle: 'back',
            headerTintColor: headerTintColor,
            headerTitleStyle: { fontFamily: 'Pretendard-SemiBold' },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
