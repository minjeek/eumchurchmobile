import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 화면 비율에 따라 다른 이미지 선택
const getSplashImage = () => {
  const ratio = height / width;
  if (ratio >= 2.1) {
    return require('../../assets/splash.png');   // 긴 화면 (iPhone 14 Pro 등)
  } else if (ratio >= 1.7) {
    return require('../../assets/splash-short.png'); // 일반 (iPhone SE 등)
  } else {
    return require('../../assets/splash-short.png');   // 태블릿 등 와이드
  }
};

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade in (0.5s)
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // 3초 유지
      Animated.delay(2000),
      // Fade out (0.5s)
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish(); // 애니메이션 완료 후 콜백
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={getSplashImage()}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // 전체 화면 덮기
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
