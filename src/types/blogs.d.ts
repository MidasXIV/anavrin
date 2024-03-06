interface Blog {
  title: string;
  description: string;
  url: string;
  slug: string;
  featured?: boolean;
  draft?: boolean;
  author: string;
  updatedAt: string;
  createdAt: string;
  content?: string;
  display?: string;
}
