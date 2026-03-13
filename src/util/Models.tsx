export type ArticleType = 'column' | 'review';

export interface ArticleItem {
  id: string;
  tab: ArticleType;
  date: string;
  title: string;
  author: string;
  body: string;
  images: number[];
}

export interface HymnItem {
  id: string;
  title: string;
  images: ImageRef[];
}

export interface ImageRef {
  image: number;
  width: number;
  height: number;
}