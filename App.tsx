/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, TabParamList } from './src/view/navigation/Navigation';

import SplashScreen from './src/view/splash/SplashScreen';
import FloatingTabBar from './src/view/navigation/FloatingTabBar';
import HomeView from './src/view/home/HomeView';
import OrderView from './src/view/order/OrderView';
import ArticlelistView from './src/view/articlelist/ArticlelistView';
import AnnouncementView from './src/view/announcement/AnnouncementView';

import ArticleView from './src/view/article/ArticleView';
import HymnView from './src/view/hymn/HymnView';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// 탭 묶음을 별도 컴포넌트로 분리
const MainTabs = () => (
  <Tab.Navigator
    id="main-tabs"
    initialRouteName="HomeView"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { display: 'none' },
    }}
    tabBar={(props) => <FloatingTabBar {...props} />}
  >
    <Tab.Screen name="HomeView" component={HomeView} />
    <Tab.Screen name="OrderView" component={OrderView} />
    <Tab.Screen name="ArticlelistView" component={ArticlelistView} />
    <Tab.Screen name="AnnouncementView" component={AnnouncementView} />
  </Tab.Navigator>
);

export default function App() {
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const homeOpacity = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(splashOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(homeOpacity,   { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Animated.View style={{ flex: 1, opacity: homeOpacity }}>
        <NavigationContainer>
          {/* Tab 대신 RootStack이 최상위 */}
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
            <RootStack.Screen name="HymnView" component={HymnView} />
            <RootStack.Screen name="ArticleView" component={ArticleView} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Animated.View>

      <Animated.View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: splashOpacity }}>
        <SplashScreen onFinish={startAnimation} />
      </Animated.View>
    </View>
  );
}