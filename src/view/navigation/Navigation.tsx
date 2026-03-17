import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp as RouteProperty } from '@react-navigation/native';

import { HymnItem, ArticleItem} from '../../model';

export type ArticleRouteProp = RouteProperty<RootStackParamList, 'ArticleView'>;
export type HymnRouteProp = RouteProperty<RootStackParamList, 'HymnView'>;
export type NavProp = NativeStackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  MainTabs: undefined;
  HymnView: HymnItem;
  ArticleView: ArticleItem;
};

export type TabParamList = {
  HomeView: undefined;
  OrderView: undefined;
  ArticlelistView: undefined;
  AnnouncementView: undefined;
};