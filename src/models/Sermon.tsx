
export interface SermonItem {
  date: string;
  id: string;
  title: string;
  bookid: number;
  fromchapter: number;
  fromverse: number;
  tochapter: number;
  toverse: number;
}

export interface BookIndexItem {
  bookid: number;
  name: string;
  chapters: number;
}

export interface BookVerseItem {
  pk: number;
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface VerseItem {
  verse: number;
  text: string;
}

export interface SermonResult {
  title: string;
  range: string;
  verseList: VerseItem[][];  // 챕터별로 묶인 구절 배열
}