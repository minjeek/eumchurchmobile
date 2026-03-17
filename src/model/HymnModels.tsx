
export interface ImageRef {
  image: number;
  width: number;
  height: number;
}

export interface HymnItem {
  id: string;
  title: string;
  images: ImageRef[];
}
