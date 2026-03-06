import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Canvas, Rect, Paint,
  Turbulence,
  mixColors,
} from '@shopify/react-native-skia';

import { 
  Defs, 
  RadialGradient,
  LinearGradient,
  Stop, 
  Svg, 
  Rect as SVGRect } from 'react-native-svg';

import { BlurView } from 'expo-blur';
import HomeLowerSections from './HomeLowerSections';

import LogoText from '../../assets/logo-text.svg';
import IconMenu from '../../assets/icon-menu.svg';
import IconNoteGreen from '../../assets/icon-note-green.svg';
import IconNoteBlue from '../../assets/icon-note-blue.svg';
import IconChevronRight from '../../assets/icon-chevron-right.svg';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const HymnArray = ['나의 가는 길', '주의 사랑을 주의 선하심을'];

const getHymnColor = (index: number): string =>
  index % 2 === 0 ? '#2EB460' : '#269ED9';

const NoteIcons = [IconNoteGreen, IconNoteBlue];

const { width } = Dimensions.get('window');
const CARD_SIZE = width - 40;

// 모서리 좌표 (x, y) — 카드 크기 기준
const CORNERS = [
  { x: 0,         y: 0         }, // 좌상
  { x: CARD_SIZE, y: 0         }, // 우상
  { x: CARD_SIZE, y: CARD_SIZE }, // 우하
  { x: 0,         y: CARD_SIZE }, // 좌하
];

const BG_COLORS =             ['#7746d8', '#6d7f4b', '#fe0229', '#2f9bca', '#5b4635', '#3c857c'];
const BIG_BG_CIRCLE_COLORS =  ['#fb69d6', '#e8e0a0', '#fed000', '#89d9d0', '#3c857c', '#5cab96'];
const MID_BG_CIRCLE_COLORS =  ['#ffb655', '#faae58', '#c5de5f', '#fccd01', '#a4d2cf', '#cbb77b'];
const WHITE_CIRCLE_COLORS =   ['#fcebd5', '#e5f7d1', '#fffad4', '#d5de8f', '#d2dddf', '#d2dddf'];

// ──────────────────────────────────────────────
// MeshGradientBackground
// ──────────────────────────────────────────────
const MeshGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { bgColor, gradientCircles } = useMemo(() => {
    // 모서리 4개를 섞어서 앞 3개를 배경 그라디언트에, 나머지 1개를 흰 원에 사용
    const shuffledCornerIndexs = [0,1,2,3].sort(() => Math.random() - 0.5);
    // const shuffledColorIndex = 4;
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
        { offset: 1, color: '#fff', opacity: 0 },
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
    // , midBGCircle, hugeMixedCircle, whiteCircle, pointCircle0, pointCircle1, pointCircle2
    return { 
      bgColor: shuffledBGColor, 
      gradientCircles: [bigBGCircle, midBGCircle, hugeMixedCircle, whiteCircle, pointCircle0, pointCircle1, pointCircle2] };
  }, []);

  const x = CARD_SIZE;
  const bgR   = x * 0.8;
  const whiteR = x;
  const accentR = x * 0.3;

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
      {children}
    </View>
  );
};

const HomeView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <LogoText width={83} height={27} />
          <IconMenu width={30} height={26} />
        </View>

        {/* Sermon Card */}
        <MeshGradientBackground>
          <Text style={styles.sermonDate}>26년 11월 16일</Text>

          <View style={styles.sermonTextArea}>
            <Text style={styles.sermonTitle}>" 죄의 종이 되었을 때 "</Text>
            <Text style={styles.sermonRef}>롬 2:10-15</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.glassButton}>
            <View style={styles.glassButtonShadow}>
              <View style={styles.glassHighlight} />
              <View style={styles.glassShadow} />
              <Text style={styles.glassButtonText}>본문보기</Text>
            </View>
          </TouchableOpacity>
        </MeshGradientBackground>

        {/* Today's Hymns */}
        <View style={styles.hymnSection}>
          <Text style={styles.sectionTitle}>오늘의 찬양</Text>

          {HymnArray.map((title, index) => {
            const color = getHymnColor(index);
            const NoteIcon = NoteIcons[index % 2];
            return (
              <TouchableOpacity
                key={index}
                style={[styles.hymnItem, { borderColor: color }]}
                activeOpacity={0.6}
              >
                <View style={styles.hymnLeft}>
                  <NoteIcon style={styles.noteIcon} />
                  <Text style={styles.hymnTitle}>{title}</Text>
                </View>
                <IconChevronRight width={24} height={24} />
              </TouchableOpacity>
            );
          })}
        </View>
        
        <HomeLowerSections />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
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
  hymnSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
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
});

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

const getMeanColor = (colorA: string, colorB: string): string => {
  const [r1, g1, b1] = hexToRgb(colorA);
  const [r2, g2, b2] = hexToRgb(colorB);
  return rgbToHex((r1 + r2) / 2, (g1 + g2) / 2, (b1 + b2) / 2);
};

export default HomeView;