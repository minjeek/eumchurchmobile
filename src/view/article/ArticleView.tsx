import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { HEADER_TOP_HEIGHT, HORIZONTAL_EDGE_PADDING, CommonStyles } from '../../util'
import { ArticleRouteProp, NavProp } from '../navigation/Navigation'
import { ArticleItem } from '../../model'

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const ArticleView: React.FC = () => {
  const route = useRoute<ArticleRouteProp>();
  const articleItem = route.params as ArticleItem;
  
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 상단 네비게이션 */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{articleItem.title}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={CommonStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.scrollContent}
      >
        {/* 상단 이미지 — 있을 때만 표시 */}
        
        {articleItem.images.length > 0 && (
          <Image
            source={articleItem.images[0]}
            style={styles.headerImage}
            resizeMode="cover"
          />
        )}

        {/* 본문 */}
        <Text style={styles.body}>{articleItem.body}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleView;

// ─────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────
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

  // ── 본문 ──
  scrollContent: {
    paddingBottom: 48,
  },
  headerImage: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH * 0.65,
    marginBottom: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 28,
    color: '#222',
    paddingVertical: 30,
    paddingHorizontal: HORIZONTAL_EDGE_PADDING,
    letterSpacing: -0.2,
  },
});