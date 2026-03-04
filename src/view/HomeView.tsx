import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';
import LogoText from '../../assets/logo-text.svg';
import IconMenu from '../../assets/icon-menu.svg';
import IconNoteGreen from '../../assets/icon-note-green.svg';
import IconNoteBlue from '../../assets/icon-note-blue.svg';
import IconChevronRight from '../../assets/icon-chevron-right.svg';

const HymnArray = [
  '나의 가는 길',
  '주의 사랑을 주의 선하심을',
];

const getHymnColor = (index: number): string =>
  (index % 2) === 0 ? '#2EB460' : '#269ED9';

const NoteIcons = [IconNoteGreen, IconNoteBlue];

const HomeView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <LogoText width={83} height={27}/>
          <IconMenu width={30} height={26}/>
        </View>

        {/* Sermon Card */}
        <View style={styles.sermonCard}>
          <Text style={styles.sermonDate}>26년 11월 16일</Text>

          <View style={styles.sermonTextArea}>
            <Text style={styles.sermonTitle}>" 죄의 종이 되었을 때 "</Text>
            <Text style={styles.sermonRef}>롬 2:10-15</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.glassButton}>
            {/* 외부 그림자는 wrapper View로 */}
            <View style={styles.glassButtonShadow}>
              {/* 상단 하이라이트 — 두께감 표현 */}
              <View style={styles.glassHighlight} />
              <View style={styles.glassShadow} />
              {/* 텍스트 */}
              <Text style={styles.glassButtonText}>본문보기</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Hymns */}
        <View style={styles.hymnSection}>
          <Text style={styles.sectionTitle}>오늘의 찬양</Text>

          {HymnArray.map((title, index) => {
            const color = getHymnColor(index);
            const NoteIcon = NoteIcons[index % 2];
            return (
              <TouchableOpacity key={index} style={[styles.hymnItem, { borderColor: color }]} activeOpacity={0.6}>
                <View style={styles.hymnLeft}>
                  <NoteIcon style={styles.noteIcon} />
                  <Text style={styles.hymnTitle}>{title}</Text>
                </View>
                <IconChevronRight width={24} height={24} />
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },

  /* Sermon Card */
  sermonCard: {
    backgroundColor: '#00aa00',
    borderRadius: 32,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 16,
    aspectRatio: 1,
    justifyContent: 'space-between',
    elevation: 8,
  },
  sermonDate: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.45)',
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
    color: '#222',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  sermonRef: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '500',
  },
  glassButton: {
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
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
    backgroundColor: '#ffffff40',
  },
  // 글래스 두께감 - hightlight와 shadow를 중첩
  glassHighlight: {
    position: 'absolute',
    top: -1,
    left: 0,
    width: '110%',
    height: '110%',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  glassShadow: {
    position: 'absolute',
    right: 0,
    bottom: -1,
    width: '110%',
    height: '110%',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  glassButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  /* Hymn Section */
  hymnSection: {
    marginTop: 24,
    marginBottom: 32,
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

export default HomeView;