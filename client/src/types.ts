export interface IPost {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user_id: number | string;
}
export interface IAPIPostsResult {
  data: IPost[];
  total_count: number;
  per_page: number;
}

export interface IUser {
  id: number | string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IRoute {
  path: string | null;
  label: string;
  Component: React.ReactNode | null;
}
