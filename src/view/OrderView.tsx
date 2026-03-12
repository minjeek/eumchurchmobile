import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { HEADER_TOP_HEIGHT } from '../util/Constants';

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────
interface OrderItem {
  id: string;
  title: string;
  details: string[];
}

// ─────────────────────────────────────────────
// 예배순서 데이터
// ─────────────────────────────────────────────
const ORDER_ITEMS: OrderItem[] = [
  { id: 'o1',  title: '기원',       details: ['인도자'] },
  { id: 'o2',  title: '입례송',     details: ['다함께'] },
  { id: 'o3',  title: '신앙고백',   details: ['사도신경'] },
  { id: 'o4',  title: '찬양과 경배', details: ['찬란한 주의 영광으로', '주의 자녀로 산다는 것은', '부족함 없네'] },
  { id: 'o5',  title: '대표기도',   details: ['손진곤 형제'] },
  { id: 'o6',  title: '말씀봉독',   details: ['출애굽기 18:1-27'] },
  { id: 'o7',  title: '말씀선포',   details: ['하나님이 세우시는 질서'] },
  { id: 'o8',  title: '화답찬송&봉헌', details: ['다함께'] },
  { id: 'o9',  title: '봉헌기도',   details: ['이경수 목사'] },
  { id: 'o10', title: '광고',       details: ['이경수 목사'] },
  { id: 'o11', title: '폐회찬송',   details: ['찬송가 434장'] },
  { id: 'o12', title: '축도',       details: ['이경수 목사'] },
];

// ─────────────────────────────────────────────
// OrderView
// ─────────────────────────────────────────────
const OrderView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>예배순서</Text>
        </View>

        <View style={styles.orderList}>
          {ORDER_ITEMS.map((item, index) => (
            <View key={item.id}>
              <View style={styles.orderRow}>
                {/* 왼쪽 — 순서 타이틀 */}
                <Text style={styles.orderTitle}>{item.title}</Text>

                {/* 오른쪽 — 세부 내용 (여러 줄 가능) */}
                <View style={styles.detailColumn}>
                  {item.details.map((detail, i) => (
                    <Text key={i} style={styles.orderDetail}>{detail}</Text>
                  ))}
                </View>
              </View>

              {/* 구분선 */}
              {/* {index < ORDER_ITEMS.length - 1 && (
                <View style={styles.divider} />
              )} */}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderView;

// ─────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  pageHeader: {
    justifyContent: 'center',
    height: HEADER_TOP_HEIGHT,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  orderList: {
    gap: 0,
    paddingVertical: 24,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    flex: 1,
  },
  detailColumn: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 4,
  },
  orderDetail: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});