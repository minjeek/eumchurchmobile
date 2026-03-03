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

import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
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
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const homeOpacity = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(homeOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 홈 (처음엔 투명) */}
      <Animated.View
        style={{ flex: 1, opacity: homeOpacity }}
      >
        <NavigationContainer>
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
            <Tab.Screen name="WorshipView" component={WorshipView} />
            <Tab.Screen name="EssayListView" component={EssayListView} />
            <Tab.Screen name="InformationView" component={InformationView} />
          </Tab.Navigator>
        </NavigationContainer>
      </Animated.View>

      {/* 스플래시 (위에 오버레이) */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: splashOpacity,
        }}
      >
        <SplashScreen onFinish={startAnimation} />
      </Animated.View>
    </View>
  );
}