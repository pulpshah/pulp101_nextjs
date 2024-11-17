export interface Comment {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: Comment[];
  userVoteLevel: number|null;
  isTopLevel: boolean,
  }
 export interface CommentProps {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    replies: CommentProps[];
}