import {
  Dimensions,
} from 'react-native';


export type RootStackParamList = {
  MainTabs: undefined;
  HymnView: { hymnId?: string };
  ArticleView: { id: string; title: string; body: string; image?: number };
};

export type TabParamList = {
  HomeView: undefined;
  OrderView: undefined;
  EssaylistView: undefined;
  AnnouncementView: undefined;
};