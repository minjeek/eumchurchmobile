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

const { width: DEVICE_WIDTH } = Dimensions.get('window');

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────
interface ArticleProps {
  title?: string;
  body?: string;
  image?: number; // require(...)
  onBack?: () => void;
}

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
const DUMMY_TITLE = '목회 칼럼';
const DUMMY_BODY = `그러므로 남을 판단하는 사람아, 누구를 막론하고 네가 핑계하지 못할 것은 남을 판단하는 것으로 네가 너를 정죄함이니 판단하는 네가 같은 일을 행함이니라이런 일을 행하는 자에게 하나님의 심판이 진리대로 되는 줄 우리가 아노라
이런 일을 행하는 자를 판단하고도 같은 일을 행하는 사람아, 네가 하나님의 심판을 피할 줄로 생각하느냐
혹 네가 하나님의 인자하심이 너를 인도하여 회개하게 하심을 알지 못하여 그의 인자하심과 용납하심과 길이 참으심이 풍성함을 멸시하느냐
다만 네 고집과 회개하지 아니한 마음을 따라 진노의 날 곧 하나님의 의로우신 심판이 나타나는 그 날에 임할 진노를 네게 쌓는도다
하나님께서 각 사람에게 그 행한 대로 보응하시되창고 선을 행하여 영광과 존귀와 썩지 아니함을 구하는 자에게는 영생으로 하시고`;

// ─────────────────────────────────────────────
// ArticleDetailView
// ─────────────────────────────────────────────
const ArticleView: React.FC<ArticleProps> = ({
  title = DUMMY_TITLE,
  body = DUMMY_BODY,
  image,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 상단 네비게이션 */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 상단 이미지 — 있을 때만 표시 */}
        {image && (
          <Image
            source={image}
            style={styles.headerImage}
            resizeMode="cover"
          />
        )}

        {/* 본문 */}
        <Text style={styles.body}>{body}</Text>
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
    height: 48,
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
  scroll: {
    flex: 1,
  },
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
    paddingHorizontal: 24,
    letterSpacing: -0.2,
  },
});