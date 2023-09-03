interface Blog {
  title: string;
  description: string;
  url: string;
  slug: string;
  featured?: boolean;
  draft?: boolean;
  author:
    | {
        username: string;
        name: string;
        avatar: string;
      }
    | string;
  updatedAt: string;
  createdAt: string;
  content?: string;
}
