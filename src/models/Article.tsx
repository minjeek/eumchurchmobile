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