import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { NavProp, HymnRouteProp } from '../util/Navigation';
import { HymnItem } from '../util/Models';
import { DEVICE_WIDTH, HEADER_TOP_HEIGHT, HORIZONTAL_EDGE_PADDING } from '../util/Constants';

import ImagePraise1 from '../../assets/praise-01.jpg';

const HymnView: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const route = useRoute<HymnRouteProp>();
  const hymnItem = route.params as HymnItem;
  
  // const onBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 상단 네비게이션 */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()} activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {(hymnItem.images).map( (imageRef) => (
          <Image
            style={styles.hymnImage}
            source={imageRef.image}
            // width={imageRef.width}
            height={(DEVICE_WIDTH) * (imageRef.height / imageRef.width)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HymnView;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── 네비게이션 ──
  navBar: {
    height: HEADER_TOP_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#111',
    lineHeight: 36,
    fontWeight: '300',
  },
  navTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  hymnImage: {
    marginTop: 10,
    width: '100%',
    // resizeMode: "contain"
  }
});