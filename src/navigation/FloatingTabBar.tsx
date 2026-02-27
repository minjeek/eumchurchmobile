import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TabKey = 'HomeView' | 'WorshipView' | 'EssayListView' | 'InformationView';

const TAB_ITEMS: Array<{
  key: TabKey;
  label: string;
  renderIcon: (focused: boolean) => React.ReactNode;
}> = [
  {
    key: 'HomeView',
    label: '홈',
    renderIcon: (focused) => <Feather name="home" size={26} color={focused ? '#111' : '#111'} />,
  },
  {
    key: 'WorshipView',
    label: '예배순서',
    renderIcon: (focused) => <Feather name="list" size={26} color={focused ? '#111' : '#111'} />,
  },
  {
    key: 'EssayListView',
    label: '칼럼',
    renderIcon: (focused) => <Feather name="file-text" size={26} color={focused ? '#111' : '#111'} />,
  },
  {
    key: 'InformationView',
    label: '광고',
    renderIcon: (focused) => <Feather name="volume-2" size={26} color={focused ? '#111' : '#111'} />,
  },
];

export default function FloatingTabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        pointerEvents="box-none"
        style={[
          styles.container,
          { paddingBottom: Math.max(12, insets.bottom + 8) },
        ]}
      >
        <View style={styles.pill}>
          {TAB_ITEMS.map((item, index) => {
            const routeIndex = state.routes.findIndex(r => r.name === item.key);
            const isFocused = state.index === routeIndex;

            return (
              <Pressable
                key={item.key}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: state.routes[routeIndex].key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(item.key);
                  }
                }}
                onLongPress={() => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: state.routes[routeIndex].key,
                  });
                }}
                style={styles.item}
              >
                {item.renderIcon(isFocused)}
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pill: {
    width: '86%',
    maxWidth: 420,
    height: 86,
    borderRadius: 999,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },

    // Android shadow
    elevation: 12,
  },
  item: {
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 16,
    color: '#111',
  },
});
