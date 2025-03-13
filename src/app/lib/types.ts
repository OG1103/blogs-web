export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  
  export type Post = {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    userId: string
    User: User
  } | null
  
  export interface Comment {
    id: string
    content: string
    createdAt: string
    authorId: string
    User: User
    postId: string
    Post: Post
  }
  
  