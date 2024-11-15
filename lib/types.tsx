export interface Comment {
    id: number; // Unique identifier for the comment
    author: string; // Name or identifier of the author
    text: string; // The text content of the comment
    createdAt: string; // Timestamp of when the comment was created
    replies: Comment[]; // Array of nested replies, recursively typed
  }