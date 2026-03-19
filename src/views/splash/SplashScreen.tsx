import React, { useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Char이 from '../../../assets/splash-1-1.svg';
import Char음 from '../../../assets/splash-1-2.svg';
import Char교 from '../../../assets/splash-1-3.svg';
import Char회 from '../../../assets/splash-1-1.svg'; // splash-1-4.svg 준비 전까지 재사용

import Splash2 from '../../../assets/splash-2.svg';
import Splash3 from '../../../assets/splash-3.svg';
import Splash4 from '../../../assets/splash-4.svg';

import { SvgProps } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

type SvgComponent = React.FC<SvgProps>;

const CHARS: SvgComponent[] = [Char이, Char음, Char교, Char회];

// phase 1 글자 크기 및 위치 (사용자가 눈으로 맞춤)
const CHAR_W = 46.2;
const CHAR_H = 49.5;
const CHAR_GAP = -15.5;
const TOTAL_W = CHARS.length * CHAR_W + (CHARS.length - 1) * CHAR_GAP;

const LOGO_CENTER_X = 195;
const LOGO_TOP_Y = 374.5;
const LEFT_EDGE_X = LOGO_CENTER_X - TOTAL_W / 2 + 1;
const getFinalX = (i: number) => LEFT_EDGE_X + i * (CHAR_W + CHAR_GAP);
const FINAL_Y = LOGO_TOP_Y + (38 - CHAR_H) / 2;

const getStartX = (i: number) => width + 60 + (CHARS.length - 1 - i) * 40;
const getStartRotate = (i: number) => 80 + i * 35;

// phase 3 레이아웃: splash-3(39) + gap(10) + splash-2(120) = 169px, 중앙 정렬
const SPLASH3_W = 39;
const SPLASH3_H = 50;
const SPLASH2_W = 120;
const SPLASH2_H = 38;
const P3_GAP = 10;
const P3_TOTAL_W = SPLASH3_W + P3_GAP + SPLASH2_W;
const P3_LEFT = width / 2 - P3_TOTAL_W / 2;
const P3_SPLASH2_FINAL_LEFT = P3_LEFT + SPLASH3_W + P3_GAP;
const P3_SPLASH2_PUSH = P3_SPLASH2_FINAL_LEFT - 135;

// splash-3, splash-2 세로 중앙 맞춤
const P3_CENTER_Y = 374 + SPLASH2_H / 2;
const P3_SPLASH3_TOP = P3_CENTER_Y - SPLASH3_H / 2;

// phase 4: splash-3이 화면 전체를 덮을 scale 값
// center of splash-3: (P3_LEFT + SPLASH3_W/2, P3_SPLASH3_TOP + SPLASH3_H/2)
const SPLASH3_CENTER_X = P3_LEFT + SPLASH3_W / 2;
const SPLASH3_CENTER_Y = P3_SPLASH3_TOP + SPLASH3_H / 2;
const COVER_SCALE = (Math.ceil(
  Math.max(
    (Math.max(SPLASH3_CENTER_X, width - SPLASH3_CENTER_X) * 2) / SPLASH3_W,
    (Math.max(SPLASH3_CENTER_Y, height - SPLASH3_CENTER_Y) * 2) / SPLASH3_H,
  ),
) + 2) * 2; // 여유값 × 2

// ─────────────────────────────────────────────
// CharBall — phase 1 개별 글자
// ─────────────────────────────────────────────
interface CharBallProps {
  SvgChar: SvgComponent;
  index: number;
  onSettled: () => void;
}

function CharBall({ SvgChar, index, onSettled }: CharBallProps) {
  const finalX = getFinalX(index);
  const delay = index * 180;

  const translateX = useSharedValue(getStartX(index));
  const translateY = useSharedValue(FINAL_Y - 80);
  const rotate = useSharedValue(getStartRotate(index));

  const notifySettled = useCallback(() => {
    onSettled();
  }, [onSettled]);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withSpring(finalX, { damping: 20, stiffness: 110, mass: 0.9 }),
    );

    translateY.value = withDelay(
      delay,
      withSequence(
        withSpring(FINAL_Y, { damping: 5, stiffness: 180, mass: 0.8 },
          (finished) => {
            'worklet';
            if (finished) runOnJS(notifySettled)();
          }),
      ),
    );

    rotate.value = withDelay(
      delay,
      withSpring(-30, { damping: 10 + index * 1.5, stiffness: 70, mass: 1 }),
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.charBase, animStyle]}>
      <SvgChar width={CHAR_W} height={CHAR_H} />
    </Animated.View>
  );
}

// ─────────────────────────────────────────────
// SplashScreen
// ─────────────────────────────────────────────
interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const settledCount = useRef(0);
  const hasTransitioned = useRef(false);

  // phase 1
  const phase1Opacity = useSharedValue(1);
  // phase 2
  const phase2Opacity = useSharedValue(0);
  const splash2PushX = useSharedValue(0);
  // phase 3
  const splash3X = useSharedValue(-(P3_LEFT + SPLASH3_W + 60));
  // phase 4
  const splash3Scale = useSharedValue(1);
  const splash3Opacity = useSharedValue(1);
  const splash4Opacity = useSharedValue(0);

  // phase 4: splash-3 확대 → splash-2 fadeout + splash-4 fadein
  const startPhase4 = useCallback(() => {
    // splash-3: 화면 전체를 덮을 때까지 확대
    splash3Scale.value = withTiming(COVER_SCALE, {
      duration: 700,
      easing: Easing.in(Easing.quad),
    });

    // 0.5초 후: splash-2 fadeout + splash-4 fadein 동시
    phase2Opacity.value = withDelay(100, withTiming(0, { duration: 300 }));
    splash4Opacity.value = withDelay(100, withTiming(1, { duration: 300 }));

    // 0.5초 후: splash-3 fadeout
    splash3Opacity.value = withDelay(500, withTiming(0, { duration: 1000 }));

    // 전체 완료 후 onFinish
    setTimeout(onFinish, 1000);
  }, [onFinish, splash3Scale, splash3Opacity, phase2Opacity, splash4Opacity]);

  // phase 3: splash-3 팡! 등장 + splash-2 push
  const startPhase3 = useCallback(() => {
    splash3X.value = withSpring(0, { damping: 22, stiffness: 350, mass: 0.6 });
    splash2PushX.value = withDelay(
      150,
      withSpring(P3_SPLASH2_PUSH, { damping: 10, stiffness: 160, mass: 0.7, velocity: 1200 }),
    );
    // phase 3 안착 후 phase 4 시작
    setTimeout(startPhase4, 1200);
  }, [startPhase4, splash3X, splash2PushX]);

  // phase 1→2 전환 (중복 호출 방지)
  const startTransition = useCallback(() => {
    if (hasTransitioned.current) return;
    hasTransitioned.current = true;

    phase1Opacity.value = withTiming(0, { duration: 1000 });
    phase2Opacity.value = withTiming(1, { duration: 300 });
    setTimeout(startPhase3, 1500);
  }, [startPhase3, phase1Opacity, phase2Opacity]);

  // 2.4초 후 강제 전환
  useEffect(() => {
    const timer = setTimeout(startTransition, 2400);
    return () => clearTimeout(timer);
  }, [startTransition]);

  const handleSettled = useCallback(() => {
    settledCount.current += 1;
    if (settledCount.current === CHARS.length) {
      startTransition();
    }
  }, [startTransition]);

  const phase1AnimStyle = useAnimatedStyle(() => ({ opacity: phase1Opacity.value }));
  const phase2AnimStyle = useAnimatedStyle(() => ({
    opacity: phase2Opacity.value,
    transform: [{ translateX: splash2PushX.value }],
  }));
  const phase3IconStyle = useAnimatedStyle(() => ({
    opacity: splash3Opacity.value,
    transform: [
      { translateX: splash3X.value },
      { scale: splash3Scale.value },
    ],
  }));
  const splash4AnimStyle = useAnimatedStyle(() => ({
    opacity: splash4Opacity.value,
    transform: [{ translateX: splash2PushX.value }],
  }));

  return (
    <View style={styles.container}>

      {/* Phase 1: 개별 글자 획들 */}
      <Animated.View style={[StyleSheet.absoluteFill, phase1AnimStyle]}>
        {CHARS.map((SvgChar, i) => (
          <CharBall
            key={i}
            SvgChar={SvgChar}
            index={i}
            onSettled={handleSettled}
          />
        ))}
      </Animated.View>

      {/* Phase 3/4: 로고 아이콘 (팡! 등장 후 화면 전체로 확대) — splash-2 뒤에 위치 */}
      <Animated.View style={[styles.phase3Icon, phase3IconStyle]}>
        <Splash3 width={SPLASH3_W} height={SPLASH3_H} />
      </Animated.View>

      {/* Phase 2: 이음교회 컬러 로고 텍스트 */}
      <Animated.View style={[styles.phase2, phase2AnimStyle]}>
        <Splash2 width={SPLASH2_W} height={SPLASH2_H} />
      </Animated.View>

      {/* Phase 4: splash-4 (splash-2와 동일 위치에 겹쳐서 fade in) */}
      <Animated.View style={[styles.phase2, splash4AnimStyle]}>
        <Splash4 width={SPLASH2_W} height={SPLASH2_H} />
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    zIndex: 999,
  },
  charBase: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  phase2: {
    position: 'absolute',
    left: 135,
    top: 374,
    width: SPLASH2_W,
    height: SPLASH2_H,
  },
  phase3Icon: {
    position: 'absolute',
    left: P3_LEFT,
    top: P3_SPLASH3_TOP,
    width: SPLASH3_W,
    height: SPLASH3_H,
  },
});
