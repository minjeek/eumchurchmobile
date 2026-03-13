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

import { useNavigation } from '@react-navigation/native';

import { NavProp } from '../util/Navigation';
import { HORIZONTAL_EDGE_PADDING, HEADER_TOP_HEIGHT, DEVICE_WIDTH } from '../util/Constants';
import { ArticleType, ArticleItem } from '../util/Models'
const { width } = Dimensions.get('window');

interface ArticleKey {
  tab: ArticleType;
  name: string;
}

const TAB_HORIZONTAL_MARGIN = 30;
const TAB_PADDING = 4;
const TAB_GAP = 8;
const TAB_WIDTH = (DEVICE_WIDTH - 60 - 8 - 8)/2;
const ARTICLE_KEYS: ArticleKey[] = [
  { tab: 'column', name: '칼럼'},
  { tab: 'review', name: '지난 주 설교'},
]

const ARTICLES: ArticleItem[] = [
  { id: 'a4', tab: 'column', date: '11/29 (일)', title: '목회 칼럼', author: '이경수 목사', body: `그러므로 남을 판단하는 사람아, 누구를 막론하고 네가 핑계하지 못할 것은 남을 판단하는 것으로 네가 너를 정죄함이니 판단하는 네가 같은 일을 행함이니라이런 일을 행하는 자에게 하나님의 심판이 진리대로 되는 줄 우리가 아노라
이런 일을 행하는 자를 판단하고도 같은 일을 행하는 사람아, 네가 하나님의 심판을 피할 줄로 생각하느냐
혹 네가 하나님의 인자하심이 너를 인도하여 회개하게 하심을 알지 못하여 그의 인자하심과 용납하심과 길이 참으심이 풍성함을 멸시하느냐
다만 네 고집과 회개하지 아니한 마음을 따라 진노의 날 곧 하나님의 의로우신 심판이 나타나는 그 날에 임할 진노를 네게 쌓는도다
하나님께서 각 사람에게 그 행한 대로 보응하시되창고 선을 행하여 영광과 존귀와 썩지 아니함을 구하는 자에게는 영생으로 하시고`, images: []},
  { id: 'a1', tab: 'column', date: '11/22 (일)', title: '이음교회 팀 소개', author: 'editer. B', body: '', images: []},
  { id: 'a2', tab: 'column', date: '11/15 (일)', title: '에디터 칼럼', author: 'editer. B', body: '', images: []},
  { id: 'a3', tab: 'column', date: '11/8 (일)',  title: '10월 컬처 코이노니아', author: 'editer. J', body: '', images: []},
  { id: 'a5', tab: 'column', date: '10/19 (일)', title: '목회 칼럼', author: '이경수 목사', body: '', images: []},
  { id: 'a6', tab: 'review', date: '11/22 (일)', title: '지난주 설교 리뷰', author: 'editer. A', body: '', images: []},
  { id: 'a7', tab: 'review', date: '11/15 (일)', title: '말씀 묵상', author: 'editer. B', body: '', images: []},
];

const THUMB_SIZE = 76;

// ─────────────────────────────────────────────
// 아이템
// ─────────────────────────────────────────────
const ArticleRow: React.FC<{ item: ArticleItem; isLast: boolean }> = ({ item, isLast }) => {
  const navigation = useNavigation<NavProp>();

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.75}
    onPress={() => navigation.navigate('ArticleView', item)}>
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
        {item.images.length > 0 && (
          <Image source={item.images[0]} style={styles.thumbImage} resizeMode="cover" />
        )}
      </View>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────
// ColumnView
// ─────────────────────────────────────────────
const ArticlelistView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ArticleType>(ARTICLE_KEYS[0].tab);

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
    paddingHorizontal: HORIZONTAL_EDGE_PADDING,
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