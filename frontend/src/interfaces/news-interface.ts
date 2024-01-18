export interface News {
  id: number;
  title: string;
  content: string;
  publish_date?: string;
  is_important: boolean;
  author_id?: number;
}
