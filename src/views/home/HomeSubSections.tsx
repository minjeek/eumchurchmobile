import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

import {
  Canvas, Rect, Paint,
  Turbulence,
} from '@shopify/react-native-skia';

import { 
  Defs, 
  RadialGradient,
  Stop, 
  Svg, 
  Rect as SVGRect } from 'react-native-svg';

import IconNoteGreen from '../../../assets/icon-note-green.svg';
import IconNoteBlue from '../../../assets/icon-note-blue.svg';
import IconChevronRight from '../../../assets/icon-chevron-right.svg';

import { useNavigation } from '@react-navigation/native';

import { getMeanColor } from '../../utils';
import { HORIZONTAL_EDGE_PADDING, DEVICE_WIDTH } from '../../utils';
import { NavProp } from '../navigation/Navigation';

import IconPerson from '../../../assets/icon-person.svg';

import { hymnList, articleMap, articleDefaultThumbnailMap, personList, eventList, eventIconMap, getSermonInfo } from './HomeViewModel';

const CARD_GAP = 10;
const CARD_WIDTH = (DEVICE_WIDTH - HORIZONTAL_EDGE_PADDING * 2 - CARD_GAP) / 2;

const CARD_SIZE = DEVICE_WIDTH - 40;

// 모서리 좌표 (x, y) — 카드 크기 기준
const CORNERS = [
  { x: 0,         y: 0         }, // 좌상
  { x: CARD_SIZE, y: 0         }, // 우상
  { x: CARD_SIZE, y: CARD_SIZE }, // 우하
  { x: 0,         y: CARD_SIZE }, // 좌하
];

const BG_COLORS =             ['#da5e5e', '#7746d8', '#5d6219', '#fe0229', '#2f9bca', '#5b4635', '#3c857c', '#5f1e46', '#2c3635', '#824540', '#5e564c', '#2f4e49'];
const BIG_BG_CIRCLE_COLORS =  ['#a08670', '#fb69d6', '#c3cc78', '#fed000', '#89d9d0', '#3c857c', '#5cab96', '#ad7c92', '#1a535c', '#5d6b6c', '#ee887a', '#bf5d30'];
const MID_BG_CIRCLE_COLORS =  ['#b3bc83', '#ffb655', '#e7b90c', '#c5de5f', '#fccd01', '#a4d2cf', '#cbb77b', '#bfbfbd', '#b8d3c0', '#9fbdbd', '#ffb7ad', '#c3803a'];
const WHITE_CIRCLE_COLORS =   ['#f2d1b0', '#fcebd5', '#cadbcb', '#fffad4', '#d5de8f', '#d2dddf', '#d2dddf', '#ab917a', '#cbb5a6', '#d9cfc3', '#c2e5df', '#d1cdc4'];

// ──────────────────────────────────────────────
// MeshGradientBackground
// ──────────────────────────────────────────────
export const MeshGradientBackground: React.FC = () => {
  const { bgColor, gradientCircles } = useMemo(() => {
    // 모서리 4개를 섞어서 앞 3개를 배경 그라디언트에, 나머지 1개를 흰 원에 사용
    const shuffledCornerIndexs = [0,1,2,3].sort(() => Math.random() - 0.5);
    // const shuffledColorIndex = 2;
    const shuffledColorIndex = [...Array(BG_COLORS.length).keys()].sort(() => Math.random() - 0.5)[0];
    const shuffledBigBGColor = BIG_BG_CIRCLE_COLORS[shuffledColorIndex];
    const shuffledMidBGColor = MID_BG_CIRCLE_COLORS[shuffledColorIndex];
    const shuffledWhiteColor = WHITE_CIRCLE_COLORS[shuffledColorIndex];
    const shuffledBGColor = BG_COLORS[shuffledColorIndex];
    // const shuffledBigBGColor = [...BIG_BG_CIRCLE_COLORS].sort(() => Math.random() - 0.5)[0];
    // const shuffledMidBGColor = [...MID_BG_CIRCLE_COLORS].sort(() => Math.random() - 0.5)[0];
    // const shuffledWhiteColor = [...WHITE_CIRCLE_COLORS].sort(() => Math.random() - 0.5)[0];
    // const shuffledBGColor = [...BG_COLORS].sort(() => Math.random() - 0.5)[0];
    const meanColor = getMeanColor(shuffledBigBGColor, shuffledWhiteColor);
    // const meanColor2 = getMeanColor(shuffledBigBGColor, shuffledMidBGColor);

    const cx = CORNERS[shuffledCornerIndexs[0]].x;
    const cy = CORNERS[shuffledCornerIndexs[0]].y;

    const bigBGCircle = {
      id: 'bgc0',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*1.4,
      stop: [
        { offset: 0.8, color: shuffledBigBGColor, opacity: 1 },
        { offset: 1, color: shuffledBigBGColor, opacity: 0 },
      ]
    };

    const midBGCircle = {
      id: 'bgc1',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*0.4,
      stop: [
        { offset: 0.6, color: shuffledMidBGColor, opacity: 1 },
        { offset: 1, color: shuffledMidBGColor, opacity: 0 },
      ]
    };

    const hugeMixedCircle = {
      id: 'bgc3',
      cx: cx,
      cy: cy,
      r: CARD_SIZE,
      stop: [
        { offset: 0.7, color: meanColor, opacity: 1 },
        { offset: 1, color: meanColor, opacity: 0 },
      ]
    }

    const whiteCircle = {
      id: 'bgc2',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*0.7,
      stop: [
        { offset: 0.5, color: shuffledWhiteColor, opacity: 0.9 },
        { offset: 1, color: shuffledWhiteColor, opacity: 0 },
      ]
    }

    const pointCircle0 = {
      id: 'bgc4',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*0.4,
      stop: [
        { offset: 0.7, color: shuffledMidBGColor, opacity: 1 },
        { offset: 1, color: shuffledMidBGColor, opacity: 0 },
      ]
    }

    const pointCircle1 = {
      id: 'bgc5',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*0.8,
      stop: [
        { offset: 0.6, color: shuffledBigBGColor, opacity: 1 },
        { offset: 1, color: getMeanColor(shuffledBigBGColor,'#ffffff'), opacity: 0 },
      ]
    }

    const pointCircle2 = {
      id: 'bgc6',
      cx: cx,
      cy: cy,
      r: CARD_SIZE*1.3,
      stop: [
        { offset: 0.9, color: shuffledBGColor, opacity: 0.9},
        { offset: 1, color: shuffledBGColor, opacity: 0 },
      ]
    }

    if (bigBGCircle.cy === 0) {
      bigBGCircle.cy -= CARD_SIZE * 0.2;
      midBGCircle.cy += CARD_SIZE * 0.2;
      hugeMixedCircle.cy += CARD_SIZE * 0.2;
      whiteCircle.cy += CARD_SIZE * 0.1;
      pointCircle0.cy += CARD_SIZE * 0.3;
      pointCircle1.cy += CARD_SIZE*0.2;
      pointCircle2.cy -= CARD_SIZE*0.1;
    } else {
      bigBGCircle.cy += CARD_SIZE * 0.2;
      midBGCircle.cy -= CARD_SIZE * 0.2;
      hugeMixedCircle.cy -= CARD_SIZE * 0.2;
      whiteCircle.cy -= CARD_SIZE * 0.1;
      pointCircle0.cy -= CARD_SIZE * 0.3;
      pointCircle1.cy -= CARD_SIZE*0.2;
      pointCircle2.cy += CARD_SIZE*0.1;
    }

    if (bigBGCircle.cx === 0) {
      bigBGCircle.cx += CARD_SIZE * 0.1;
      midBGCircle.cx += CARD_SIZE * 0.75;
      hugeMixedCircle.cx += CARD_SIZE * 0;
      whiteCircle.cx += CARD_SIZE * 0.4;
      pointCircle0.cx = -CARD_SIZE * 0.2;
      pointCircle1.cx = -CARD_SIZE * 0.5;
      pointCircle2.cx = -CARD_SIZE * 1.2;
    } else {
      bigBGCircle.cx -= CARD_SIZE * 0.1;
      midBGCircle.cx -= CARD_SIZE * 0.75;
      hugeMixedCircle.cx += CARD_SIZE * 0;
      whiteCircle.cx -= CARD_SIZE * 0.4;
      pointCircle0.cx += CARD_SIZE * 0.2;
      pointCircle1.cx += CARD_SIZE * 0.5;
      pointCircle2.cx += CARD_SIZE * 1.2;
    }
    return { 
      bgColor: shuffledBGColor, 
      gradientCircles: [bigBGCircle, midBGCircle, hugeMixedCircle, whiteCircle, pointCircle0, pointCircle1, pointCircle2] };
  }, []);

  const x = CARD_SIZE;
  const bgR   = x * 0.8;
  const whiteR = x;
  const accentR = x * 0.3;
  const sermonInfo = getSermonInfo();

  return (
    <View style={styles.sermonCard}>
      <Svg
        width={x}
        height={x}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          {/* 배경 그라디언트 원 3개 */}

          { gradientCircles.map((circle, i) => (
            <RadialGradient
              key={circle.id}
              id={circle.id}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              gradientUnits="userSpaceOnUse"
            >
              {circle.stop.map((stop, j) => (
                <Stop key={j} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
              ))}
            </RadialGradient>
          ))}
        </Defs>

        {/* 베이스 배경 */}
        <SVGRect x="0" y="0" width={x} height={x} fill={ bgColor } />

        {/* 그라디언트 원들 */}
        { gradientCircles.map((circle, i) => (
          <SVGRect key={`r${circle.id}`} x="0" y="0" width={x} height={x} fill={`url(#${circle.id})`} />
        ))}
      </Svg>

      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <Rect x={0} y={0} width={x} height={x} opacity={0.01}>
          <Paint color="rgba(180, 140, 220, 0.15)" blendMode="overlay">
            <Turbulence freqX={0.65} freqY={0.65} octaves={6} />
          </Paint>
        </Rect>
      </Canvas>

      {/* 카드 콘텐츠 */}
      <Text style={styles.sermonDate}>2026. 3. 15. 제 20호</Text>

      <View style={styles.sermonTextArea}>
        <Text style={styles.sermonTitle}>" {sermonInfo.title} "</Text>
        <Text style={styles.sermonRef}>{sermonInfo.range}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.85} style={styles.glassButton}>
        <View style={styles.glassButtonShadow}>
          <View style={styles.glassHighlight} />
          <View style={styles.glassShadow} />
          <Text style={styles.glassButtonText}>본문보기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// ─────────────────────────────────────────────
// 찬양 목록 섹션
// ─────────────────────────────────────────────
const getHymnColor = (index: number): string =>
  index % 2 === 0 ? '#2EB460' : '#269ED9';

const NoteIcons = [IconNoteGreen, IconNoteBlue];

export const HymnListView: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.hymnSection}>
      <Text style={styles.sectionTitle}>오늘의 찬양</Text>

      {hymnList.map((hymnItem, index) => {
        const color = getHymnColor(index);
        const NoteIcon = NoteIcons[index % 2];
        return (
          <TouchableOpacity
            key={index}
            style={[styles.hymnItem, { borderColor: color }]}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('HymnView', hymnItem)}
          >
            <View style={styles.hymnLeft}>
              <NoteIcon style={styles.noteIcon} />
              <Text style={styles.hymnTitle}>{hymnItem.title}</Text>
            </View>
            <IconChevronRight width={24} height={24} />
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

// ─────────────────────────────────────────────
// 콘텐츠 카드 섹션 — 항상 2장 고정
// ─────────────────────────────────────────────
export const ArticleSection: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  
  return(
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>함께 걷기</Text>
      <View style={styles.contentCardRow}>
        {Object.entries(articleMap).map(( [articleType, articleItem] ) => (
          <TouchableOpacity key={articleType} style={styles.contentCard} activeOpacity={0.85}
          onPress={() => navigation.navigate('ArticleView', articleItem)}>
            <View style={styles.contentCardImage}>
              <Image 
                source={articleItem.images.length > 0 ? { uri: articleItem.images[0] } : articleDefaultThumbnailMap[articleType]}
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
export const BirthdaySection: React.FC = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Happy Birthday</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.birthdayScrollContent}
    >
      {personList.map((person) => (
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
export const EventSection: React.FC = () => (
  <View style={styles.section}>
    <Text style={styles.eventMonthTitle}>2026. 11</Text>
    <View style={styles.eventList}>
      {eventList.map((event, index) => (
        <View key={event.id}>
          <TouchableOpacity style={styles.eventItem} activeOpacity={0.7}>
            <View style={styles.eventIconBox}>
              <Text style={styles.eventIconText}>{eventIconMap[event.icon]}</Text>
            </View>
            <View style={styles.eventTextBox}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
            <Text style={styles.eventDate}>{event.date}</Text>
          </TouchableOpacity>
          {index < eventList.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  </View>
);

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
  sermonDate: {
    fontSize: 13,
    color: '#767676',
    fontWeight: '500',
  },
  sermonTextArea: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  sermonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  sermonRef: {
    fontSize: 13,
    color: '#111111',
    fontWeight: '500',
  },
  glassButton: {
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 12,
  },
  glassButtonShadow: {
    borderRadius: 21,
    width: 124,
    height: 42,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff50',
  },
  glassHighlight: {
    position: 'absolute',
    top: -1,
    left: 0,
    width: '110%',
    height: '110%',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  glassShadow: {
    position: 'absolute',
    right: 0,
    bottom: -1,
    width: '110%',
    height: '110%',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  glassButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(255,255,255,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // -- 설교카드 --
  sermonCard: {
    borderRadius: 32,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 16,
    aspectRatio: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 8,
  },
  // -- 찬양 목록 --
  hymnSection: {
    marginTop: 24,
  },
  hymnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
    borderWidth: 1,
    borderRadius: 21,
    paddingVertical: 2,
    paddingLeft: 21,
    paddingRight: 9,
    marginBottom: 10,
  },
  hymnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  noteIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hymnTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
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