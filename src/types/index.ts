interface UserArticle {
  userId: number;
  userName: string;
  introduction: string;
  articleList: Article[];
}

interface Article {
  articleId: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  commentList: Comment[];
}

interface Comment {
  commentId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthToken {
  exp: number;
  id: number;
  name: string;
}

export type { UserArticle, Article, Comment, AuthToken };
