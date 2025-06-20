import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { TabItems } from '@/constants/TabItems';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const tabBarActiveTintColor = useThemeColor('tint')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: Colors.grayAD,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: 'transparent', // iOS에서 블러 효과를 보여주기 위한 투명 배경
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {TabItems.map((item) => {
        return (
          <Tabs.Screen
            key={item.screen}
            name={item.screen}
            options={{
              title: item.title,
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name={item.icon as any} color={color} />,
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Pretendard-SemiBold'
              }
            }}
          />
        );
      })}
    </Tabs>
  );
}
