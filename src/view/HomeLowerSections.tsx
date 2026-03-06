import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Svg } from 'react-native-svg';

import ImageSermon from '../../assets/placeholder-sermon.png';
import ImageColumn from '../../assets/placeholder-column.png';
import IconPerson from '../../assets/icon-person.svg';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 0;
const CARD_GAP = 10;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

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

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
const CONTENT_CARDS: [ContentCard, ContentCard] = [
  { id: 'c1', tag: 'COLUMN', title: '목회 칼럼',   author: '이경수 목사' },
  { id: 'c2', tag: 'REVIEW', title: '지난주 설교', author: 'Editor B' },
];

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

// ─────────────────────────────────────────────
// 콘텐츠 카드 섹션 — 항상 2장 고정
// ─────────────────────────────────────────────
const ContentSection: React.FC = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>함께 걷기</Text>
    <View style={styles.contentCardRow}>
      {/* {CONTENT_CARDS.map((card) => ( */}
        <TouchableOpacity key='column' style={styles.contentCard} activeOpacity={0.85}>
          <View style={styles.contentCardImage}>
            <Image source={ImageColumn} style={styles.contentCardImagePlaceholder} />
            <View style={styles.contentTag}>
              <Text style={styles.contentTagText}>COLUMN</Text>
            </View>
            <Text style={styles.contentCardTitle} numberOfLines={1}>{CONTENT_CARDS[0].title}</Text>
            <Text style={styles.contentCardAuthor} numberOfLines={1}>{CONTENT_CARDS[0].author}</Text>
          </View>
          {/* <View style={styles.contentCardBody}>
          </View> */}
        </TouchableOpacity>

        <TouchableOpacity key='sermon' style={styles.contentCard} activeOpacity={0.85}>
          <View style={styles.contentCardImage}>
            <Image source={ImageSermon} style={styles.contentCardImagePlaceholder} />
            <View style={styles.contentTag}>
              <Text style={styles.contentTagText}>REVIEW</Text>
            </View>
            <Text style={styles.contentCardTitle} numberOfLines={1}>{CONTENT_CARDS[1].title}</Text>
            <Text style={styles.contentCardAuthor} numberOfLines={1}>{CONTENT_CARDS[1].author}</Text>
          </View>
        </TouchableOpacity>
      {/* ))} */}
    </View>
  </View>
);

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
const HomeLowerSections: React.FC = () => (
  <View style={styles.container}>
    <ContentSection />
    <BirthdaySection />
    <EventSection />
  </View>
);

export default HomeLowerSections;

// ─────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 40,
    paddingHorizontal: HORIZONTAL_PADDING,
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