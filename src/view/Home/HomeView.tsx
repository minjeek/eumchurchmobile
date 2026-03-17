import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavProp } from '../navigation/Navigation';
import { HEADER_TOP_HEIGHT, CommonStyles} from '../../util';
import { MeshGradientBackground, HymnListView, ArticleSection, BirthdaySection, EventSection } from './HomeSubSections';

import LogoText from '../../../assets/logo-text.svg';
import IconMenu from '../../../assets/icon-menu.svg';

const HomeView: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        style={CommonStyles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.scrollContent}
      >

        {/* Header */}
        <View style={styles.header}>
          <LogoText width={83} height={27} />
          <IconMenu width={30} height={26} />
        </View>

        <MeshGradientBackground />
        
        <HymnListView />
        
        <ArticleSection />

        <BirthdaySection />

        <EventSection />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_TOP_HEIGHT,
  },
});

export default HomeView;