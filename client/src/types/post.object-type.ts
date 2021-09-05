export interface IPostObjectType {
  id?: number;
  email: string;
  content: string;
  rating: number;
  storeName: string;
  categoryName: string;
}

export interface IPost extends IPostObjectType {
  fullName?: string;
  avatarUrl?: string;
  star?: string;
}
