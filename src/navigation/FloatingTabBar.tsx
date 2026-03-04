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

// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeIcon from '../../assets/icon-tab-home.svg';
import OrderIcon from '../../assets/icon-tab-order.svg';
import EssaylistIcon from '../../assets/icon-tab-essaylist.svg';
import AnnouncementIcon from '../../assets/icon-tab-announcement.svg';

type TabKey = 'HomeView' | 'WorshipView' | 'EssaylistView' | 'AnnouncementView';

const TAB_ITEMS: Array<{
  key: TabKey;
  label: string;
  renderIcon: (focused: boolean) => React.ReactNode;
}> = [
  {
    key: 'HomeView',
    label: '홈',
    renderIcon: (focused) => (
      <HomeIcon
        width={28}
        height={28}
        fill={focused ? '#111' : '#999'}
      />
    ),
  },
  {
    key: 'WorshipView',
    label: '예배순서',
    renderIcon: (focused) => (
      <OrderIcon
        width={28}
        height={28}
        fill={focused ? '#111' : '#999'}
      />
    ),
  },
  {
    key: 'EssaylistView',
    label: '칼럼',
    renderIcon: (focused) => (
      <EssaylistIcon
        width={30}
        height={30}
        fill={focused ? '#111' : '#999'}
      />
    ),
  },
  {
    key: 'AnnouncementView',
    label: '광고',
    renderIcon: (focused) => (
      <AnnouncementIcon
        width={28}
        height={28}
        fill={focused ? '#111' : '#999'}
      />
    ),
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
    maxWidth: 292,
    height: 56,
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
    width: 67,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#111',
  },
});
