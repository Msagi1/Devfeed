export interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  url: string;
  publishedAt: string;
  tags: string[];
  content? : string
}