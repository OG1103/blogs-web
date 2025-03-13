export interface User {
    id: string
    name: string
    email: string
  }
  
  export interface Post {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    authorId: string
    author: User
    likes: number
    commentCount: number
  }
  
  export interface Comment {
    id: string
    content: string
    createdAt: string
    authorId: string
    author: User
    postId: string
    postTitle: string
  }
  
  