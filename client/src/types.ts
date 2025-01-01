export interface IPost {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
export interface IAPIPostsResult {
  data: IPost[];
  total_count: number;
  per_page: number;
}

export interface IRoute {
  path: string;
  label: string;
}
