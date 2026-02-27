/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/components/SplashScreen';
import HomeView from './src/view/HomeView';
import EssayListView from './src/view/EssayListView';
import WorshipView from './src/view/WorshipView';
import InformationView from './src/view/InformationView';
import FloatingTabBar from './src/navigation/FloatingTabBar';

export type RootTabParamList = {
  HomeView: undefined;
  WorshipView: undefined;
  EssayListView: undefined;
  InformationView: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeView"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { display: 'none' },
          }}
          tabBar={(props: BottomTabBarProps) => <FloatingTabBar {...props} />}
        >
          <Tab.Screen name="HomeView" component={HomeView} />
          <Tab.Screen name="WorshipView" component={WorshipView} />
          <Tab.Screen name="EssayListView" component={EssayListView} />
          <Tab.Screen name="InformationView" component={InformationView} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* 스플래시를 NavigationContainer 위에 오버레이 */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </View>
  );
}
