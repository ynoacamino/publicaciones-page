export interface Glosary {
  word: string;
  description: string;
}

export interface Section {
  name: string;
}

export interface Article {
  imgSrc: string;
  title: string;
  author?: string;
  seccion: string;
  preview: string;
  titleBody: string;
  body: string;
  createdAt: {
    $date: string;
  }
  pdfSrc?: string;
  path: string;
  videoUrl?: string;
}

export interface Author {
  name: string;
  image: string;
  position: string;
  facebookLink: string;
}
