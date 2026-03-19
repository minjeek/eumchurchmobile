import { ImageSourcePropType } from 'react-native';
import { 
  ArticleType, ArticleItem, 
  EventType, EventItem, 
  HymnItem, 
  PersonItem, 
  SermonItem, BookIndexItem, SermonResult, BookVerseItem, VerseItem } from '../../models';

import bibleIndex from '../../../assets/bible-index.json';
import bibleData from '../../../assets/bible.json';

import ImageReview from '../../../assets/placeholder-sermon.png';
import ImageColumn from '../../../assets/placeholder-column.png';

const sermonItem: SermonItem = {
  date: '2026-11-16',
  id: '20',
  title: '죄의 종이 되었을 때',
  bookid: 45,
  fromchapter: 2,
  fromverse: 10,
  tochapter: 2,
  toverse: 15,
};

export const hymnList: HymnItem[] = [
  {id: '1', title: '주님의 그 모든 것이', images: [{image: require('../../../assets/praise-01.jpg'), width: 1206, height: 1687}]},
  {id: '2', title: '주의 자녀로 산다는 것은', images: [{image: require('../../../assets/praise-02.jpg'), width: 808, height: 816}, {image: require('../../../assets/praise-01.jpg'), width: 1206, height: 1687}]},
  {id: '3', title: '찬란한 주의 영광으로', images: [{image: require('../../../assets/praise-03.jpg'), width: 1200, height: 1800}]},
];

export const articleMap: Record<ArticleType, ArticleItem> = {
  column: { id: 'a4', tab: 'column', date: '11/29 (일)', title: '목회 칼럼', author: '이경수 목사', body: `그러므로 남을 판단하는 사람아, 누구를 막론하고 네가 핑계하지 못할 것은 남을 판단하는 것으로 네가 너를 정죄함이니 판단하는 네가 같은 일을 행함이니라이런 일을 행하는 자에게 하나님의 심판이 진리대로 되는 줄 우리가 아노라
이런 일을 행하는 자를 판단하고도 같은 일을 행하는 사람아, 네가 하나님의 심판을 피할 줄로 생각하느냐
혹 네가 하나님의 인자하심이 너를 인도하여 회개하게 하심을 알지 못하여 그의 인자하심과 용납하심과 길이 참으심이 풍성함을 멸시하느냐
다만 네 고집과 회개하지 아니한 마음을 따라 진노의 날 곧 하나님의 의로우신 심판이 나타나는 그 날에 임할 진노를 네게 쌓는도다
하나님께서 각 사람에게 그 행한 대로 보응하시되창고 선을 행하여 영광과 존귀와 썩지 아니함을 구하는 자에게는 영생으로 하시고`, images: []},
  review: { id: 'a6', tab: 'review', date: '11/22 (일)', title: '지난주 설교 리뷰', author: 'editer. A', body: '', images: []},
};

export const articleDefaultThumbnailMap: Record<ArticleType, ImageSourcePropType> = {
  column: ImageColumn,
  review: ImageReview,
};

export const personList: PersonItem[] = [
  { id: 'b1', name: '한명기', date: '10.07' },
  { id: 'b2', name: '손진곤', date: '10.07' },
  { id: 'b3', name: '박재형', date: '10.07' },
  { id: 'b4', name: '김수진', date: '10.07' },
  { id: 'b5', name: '이경아', date: '10.08' },
];

export const eventList: EventItem[] = [
  { id: 'e1', icon: 'group', title: '컬처 코이노니아', location: '가을 운동회 _ 고양스타디움', date: '11/1(일)' },
  { id: 'e2', icon: 'cross', title: '전교인 노방전도', location: '신촌역 6번 출구 앞',         date: '11/8(일)' },
  { id: 'e3', icon: 'pray',  title: '기도 모임',       location: '이음교회',                   date: '11/1(일)' },
  { id: 'e4', icon: 'cross', title: '전교인 노방전도', location: '신촌역 6번 출구 앞',         date: '11/8(일)' },
];

export const eventIconMap: Record<EventType, string> = {
  group:   '👥',
  cross:   '✝️',
  pray:    '🙏',
  worship: '🎵',
};


export const getSermonInfo = (): SermonResult => {
  // 책 이름 찾기
  const book = (bibleIndex as BookIndexItem[]).find(b => b.bookid === sermonItem.bookid);
  const bookName = book?.name ?? '알 수 없음';
  const title = sermonItem.title;
  // 범위 문자열
  const range = `${bookName} ${sermonItem.fromchapter}:${sermonItem.fromverse}-${sermonItem.tochapter}:${sermonItem.toverse}`;

  // 해당 범위 구절 필터링
  const filtered = (bibleData as BookVerseItem[]).filter(v => {
    if (v.book !== sermonItem.bookid) return false;
    if (v.chapter < sermonItem.fromchapter || v.chapter > sermonItem.tochapter) return false;
    if (v.chapter === sermonItem.fromchapter && v.verse < sermonItem.fromverse) return false;
    if (v.chapter === sermonItem.tochapter && v.verse > sermonItem.toverse) return false;
    return true;
  });

  // 챕터별로 묶기
  const chapterMap = new Map<number, VerseItem[]>();
  filtered.forEach(v => {
    if (!chapterMap.has(v.chapter)) chapterMap.set(v.chapter, []);
    chapterMap.get(v.chapter)!.push({ verse: v.verse, text: v.text });
  });

  const verseList = Array.from(chapterMap.values());

  return { title, range, verseList };
};