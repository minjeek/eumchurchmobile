import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

import { Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { ArticleType, ArticleItem } from '../util/Models';;
import { HORIZONTAL_EDGE_PADDING, DEVICE_WIDTH } from '../util/Constants';
import { NavProp } from '../util/Navigation';

import ImageReview from '../../assets/placeholder-sermon.png';
import ImageColumn from '../../assets/placeholder-column.png';
import IconPerson from '../../assets/icon-person.svg';

const CARD_GAP = 10;
const CARD_WIDTH = (DEVICE_WIDTH - HORIZONTAL_EDGE_PADDING * 2 - CARD_GAP) / 2;

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────
type ContentTag = 'COLUMN' | 'REVIEW' | 'NEWS' | 'EVENT';
type EventIcon = 'group' | 'cross' | 'pray' | 'worship';

interface ContentCard {
  id: string;
  tag: ContentTag;
  title: string;
  author: string;
}

interface BirthdayPerson {
  id: string;
  name: string;
  date: string;
}

interface ChurchEvent {
  id: string;
  icon: EventIcon;
  title: string;
  location: string;
  date: string;
}

const BIRTHDAY_PEOPLE: BirthdayPerson[] = [
  { id: 'b1', name: '한명기', date: '10.07' },
  { id: 'b2', name: '손진곤', date: '10.07' },
  { id: 'b3', name: '박재형', date: '10.07' },
  { id: 'b4', name: '김수진', date: '10.07' },
  { id: 'b5', name: '이경아', date: '10.08' },
];

const CHURCH_EVENTS: ChurchEvent[] = [
  { id: 'e1', icon: 'group', title: '컬처 코이노니아', location: '가을 운동회 _ 고양스타디움', date: '11/1(일)' },
  { id: 'e2', icon: 'cross', title: '전교인 노방전도', location: '신촌역 6번 출구 앞',         date: '11/8(일)' },
  { id: 'e3', icon: 'pray',  title: '기도 모임',       location: '이음교회',                   date: '11/1(일)' },
  { id: 'e4', icon: 'cross', title: '전교인 노방전도', location: '신촌역 6번 출구 앞',         date: '11/8(일)' },
];

const TAG_COLORS: Record<ContentTag, string> = {
  COLUMN: '#4a4a4a',
  REVIEW: '#2f2f2f',
  NEWS:   '#1a5c3a',
  EVENT:  '#7746d8',
};

const EVENT_ICON_MAP: Record<EventIcon, string> = {
  group:   '👥',
  cross:   '✝️',
  pray:    '🙏',
  worship: '🎵',
};

const ARTICLES: Record<ArticleType, ArticleItem> = {
  column: { id: 'a4', tab: 'column', date: '11/29 (일)', title: '목회 칼럼', author: '이경수 목사', body: `그러므로 남을 판단하는 사람아, 누구를 막론하고 네가 핑계하지 못할 것은 남을 판단하는 것으로 네가 너를 정죄함이니 판단하는 네가 같은 일을 행함이니라이런 일을 행하는 자에게 하나님의 심판이 진리대로 되는 줄 우리가 아노라
이런 일을 행하는 자를 판단하고도 같은 일을 행하는 사람아, 네가 하나님의 심판을 피할 줄로 생각하느냐
혹 네가 하나님의 인자하심이 너를 인도하여 회개하게 하심을 알지 못하여 그의 인자하심과 용납하심과 길이 참으심이 풍성함을 멸시하느냐
다만 네 고집과 회개하지 아니한 마음을 따라 진노의 날 곧 하나님의 의로우신 심판이 나타나는 그 날에 임할 진노를 네게 쌓는도다
하나님께서 각 사람에게 그 행한 대로 보응하시되창고 선을 행하여 영광과 존귀와 썩지 아니함을 구하는 자에게는 영생으로 하시고`, images: []},
  review: { id: 'a6', tab: 'review', date: '11/22 (일)', title: '지난주 설교 리뷰', author: 'editer. A', body: '', images: []},
  };

const ARTICLE_DEFAULT_THUMBNAIL: Record<ArticleType, ImageSourcePropType> = {
  column: ImageColumn,
  review: ImageReview,
}

// ─────────────────────────────────────────────
// 콘텐츠 카드 섹션 — 항상 2장 고정
// ─────────────────────────────────────────────
const ContentSection: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const column = ARTICLES.column;
  const review = ARTICLES.review;

  return(
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>함께 걷기</Text>
      <View style={styles.contentCardRow}>
        {Object.entries(ARTICLES).map(( [articleType, articleItem] ) => (
          <TouchableOpacity key={articleType} style={styles.contentCard} activeOpacity={0.85}
          onPress={() => navigation.navigate('ArticleView', articleItem)}>
            <View style={styles.contentCardImage}>
              <Image 
                source={articleItem.images.length > 0 ? { uri: articleItem.images[0] } : ARTICLE_DEFAULT_THUMBNAIL[articleType]}
                style={styles.contentCardImagePlaceholder} />
              <View style={styles.contentTag}>
                <Text style={styles.contentTagText}>{articleType.toUpperCase()}</Text>
              </View>
              <Text style={styles.contentCardTitle} numberOfLines={1}>{articleItem.title}</Text>
              <Text style={styles.contentCardAuthor} numberOfLines={1}>{articleItem.author}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────
// 생일 섹션
// ─────────────────────────────────────────────
const BirthdaySection: React.FC = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Happy Birthday</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.birthdayScrollContent}
    >
      {BIRTHDAY_PEOPLE.map((person) => (
        <View key={person.id} style={styles.birthdayItem}>
          <IconPerson />
          <Text style={styles.birthdayName}>{person.name}</Text>
          <Text style={styles.birthdayDate}>{person.date}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

// ─────────────────────────────────────────────
// 일정 섹션
// ─────────────────────────────────────────────
const EventSection: React.FC = () => (
  <View style={styles.section}>
    <Text style={styles.eventMonthTitle}>2026. 11</Text>
    <View style={styles.eventList}>
      {CHURCH_EVENTS.map((event, index) => (
        <View key={event.id}>
          <TouchableOpacity style={styles.eventItem} activeOpacity={0.7}>
            <View style={styles.eventIconBox}>
              <Text style={styles.eventIconText}>{EVENT_ICON_MAP[event.icon]}</Text>
            </View>
            <View style={styles.eventTextBox}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
            <Text style={styles.eventDate}>{event.date}</Text>
          </TouchableOpacity>
          {index < CHURCH_EVENTS.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  </View>
);

// ─────────────────────────────────────────────
// 메인 export
// ─────────────────────────────────────────────
const HomeLowerSections: React.FC = () => {
  return (
    <View style={styles.container}>
      <ContentSection />
      <BirthdaySection />
      <EventSection />
    </View>
  );
};

export default HomeLowerSections;

// ─────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  section: {
    marginTop: 40,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
  },

  // ── 콘텐츠 카드 — 2장 고정 ──
  contentCardRow: {
    flexDirection: 'row',
    gap: CARD_GAP,
  },
  contentCard: {
    width: CARD_WIDTH,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contentCardImage: {
    width: '100%',
    height: CARD_WIDTH * 1.28,
  },
  contentCardImagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  contentTag: {
    position: 'absolute',
    width: 68,
    height: 32,
    marginTop: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#11111166',
    borderWidth: 1,
    borderColor: '#ffffff66',
  },
  contentTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.04,
  },
  contentCardBody: {
    padding: 10,
  },
  contentCardTitle: {
    position: 'relative',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    left: 12,
    bottom: 50,
  },
  contentCardAuthor: {
    position: 'relative',
    fontSize: 12,
    color: '#fff',
    left: 12,
    bottom: 46,
  },

  // ── 생일 ──
  birthdayScrollContent: {
    paddingRight: 20,
    gap: 16,
  },
  birthdayItem: {
    alignItems: 'center',
    gap: 5,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#269ED9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  avatarIcon: {
    fontSize: 26,
    color: '#aaa',
  },
  birthdayName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222',
  },
  birthdayDate: {
    fontSize: 11,
    color: '#999',
  },

  // ── 일정 ──
  eventMonthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
  },
  eventList: {
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  eventIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventIconText: {
    fontSize: 18,
  },
  eventTextBox: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#888',
  },
  eventDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ebebeb',
    marginLeft: 54,
  },
});