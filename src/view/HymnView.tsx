import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../util/Navigation';

import ImagePraise1 from '../../assets/praise-01.jpg';

type RouteType = RouteProp<RootStackParamList, 'HymnView'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'HymnView'>;

const HymnView: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavProp>();

  const { hymnId } = route.params ?? {};

  const onBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow'}}>
        <Image source={ImagePraise1} style={styles.notesImage} />
      </View>
    </SafeAreaView>
  );
};

export default HymnView;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notesImage: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
});