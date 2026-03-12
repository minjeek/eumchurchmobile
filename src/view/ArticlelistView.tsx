import React, { useState } from 'react';
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

import { HORIZONTAL_EDGE_PADDING, HEADER_TOP_HEIGHT, DEVICE_WIDTH } from '../util/Constants';
const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────
type TabType = 'column' | 'review';

interface ArticleItem {
  id: string;
  tab: TabType;
  date: string;
  title: string;
  author: string;
  image?: number; // require(...)
}

interface ArticleKey {
  tab: TabType;
  name: string;
}

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────

const TAB_HORIZONTAL_MARGIN = 30;
const TAB_PADDING = 4;
const TAB_GAP = 8;
const TAB_WIDTH = (DEVICE_WIDTH - 60 - 8 - 8)/2;
const ARTICLE_KEYS: ArticleKey[] = [
  { tab: 'column', name: '칼럼'},
  { tab: 'review', name: '지난 주 설교'},
]

const ARTICLES: ArticleItem[] = [
  { id: 'a1', tab: 'column', date: '11/22 (일)', title: '이음교회 팀 소개',    author: 'editer. B' },
  { id: 'a2', tab: 'column', date: '11/15 (일)', title: '에디터 칼럼',         author: 'editer. B' },
  { id: 'a3', tab: 'column', date: '11/8 (일)',  title: '10월 컬처 코이노니아', author: 'editer. J' },
  { id: 'a4', tab: 'column', date: '10/26 (일)', title: '목회 칼럼',           author: '이경수 목사' },
  { id: 'a5', tab: 'column', date: '10/19 (일)', title: '목회 칼럼',           author: '이경수 목사' },
  { id: 'a6', tab: 'review', date: '11/22 (일)', title: '지난주 설교 리뷰',    author: 'editer. A' },
  { id: 'a7', tab: 'review', date: '11/15 (일)', title: '말씀 묵상',           author: 'editer. B' },
];

const THUMB_SIZE = 76;

// ─────────────────────────────────────────────
// 아이템
// ─────────────────────────────────────────────
const ArticleRow: React.FC<{ item: ArticleItem; isLast: boolean }> = ({ item, isLast }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.75}>
    {/* 왼쪽 타임라인 */}
    <View style={styles.timeline}>
      <View style={styles.timelineDot} />
      {!isLast && <View style={styles.timelineLine} />}
    </View>

    {/* 텍스트 */}
    <View style={styles.rowContent}>
      <Text style={styles.rowDate}>{item.date}</Text>
      <Text style={styles.rowTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.rowAuthor}>{item.author}</Text>
    </View>

    {/* 썸네일 */}
    <View style={styles.thumb}>
      {item.image
        ? <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
        : <View style={styles.thumbPlaceholder} />
      }
    </View>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// ColumnView
// ─────────────────────────────────────────────
const ArticlelistView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(ARTICLE_KEYS[0].tab);

  const filtered = ARTICLES.filter((a) => a.tab === activeTab);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 상단 탭 */}
      <View style={styles.tabBar}>
        {(ARTICLE_KEYS).map( (articleKey) => (
          <TouchableOpacity
            key={articleKey.tab}
            style={[styles.tab, activeTab === articleKey.tab && styles.tabActive]}
            onPress={() => setActiveTab(articleKey.tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === articleKey.tab && styles.tabTextActive]}>
              {articleKey.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 리스트 */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((item, index) => (
          <ArticleRow
            key={item.id}
            item={item}
            isLast={index === filtered.length - 1}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticlelistView;

// ─────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── 탭 ──
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    borderRadius: 19,
    height: 38,
    marginVertical: (HEADER_TOP_HEIGHT-38)/2,
    marginHorizontal: TAB_HORIZONTAL_MARGIN,
    padding: TAB_PADDING,
    gap: TAB_GAP,
  },
  tab: {
    borderRadius: 15,
    borderWidth: 1,
    width: TAB_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    borderColor: '#ffffff00',
    backgroundColor: '#ffffff00',
  },
  tabActive: {
    backgroundColor: 'white',
    // borderColor: '#269ED9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#767676',
  },
  tabTextActive: {
    color: '#269ED9',
    fontWeight: '600',
  },

  // ── 리스트 ──
  scroll: {
    flex: 1,
    paddingTop: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  // ── 아이템 ──
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 100,
    paddingBottom: 4,
  },

  // 타임라인
  timeline: {
    width: 20,
    alignItems: 'center',
    marginTop: 6,
    marginRight: 14,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#269ED9',
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: '#d8e8f5',
    marginTop: 4,
    minHeight: 80,
  },

  // 텍스트
  rowContent: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 24,
    gap: 3,
  },
  rowDate: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '400',
    marginBottom: 2,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    lineHeight: 22,
  },
  rowAuthor: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  // 썸네일
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 12,
    marginTop: 2,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e8e8e8',
  },
});