import type { Post, Comment, User } from "./types"

// Dummy users
export const dummyUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob@example.com",
  },
]

// Dummy posts
export const dummyPosts: Post[] = [
  {
    id: "post-1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that enables server-side rendering and static site generation. It's a great choice for building modern web applications.\n\nIn this post, I'll share my experience with Next.js and why I think it's a game-changer for frontend development. The framework provides an excellent developer experience with features like fast refresh, automatic routing, and built-in CSS support.",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    authorId: "user-1",
    author: dummyUsers[0],
    likes: 15,
    commentCount: 3,
  },
  {
    id: "post-2",
    title: "The Power of TypeScript",
    content:
      "TypeScript adds static typing to JavaScript, making it easier to catch errors early and improve code quality. I've been using TypeScript for all my projects lately and it's been a game-changer.\n\nThe type system helps prevent common bugs and provides better tooling support. If you're not using TypeScript yet, you should definitely give it a try!",
    createdAt: "2023-05-10T14:20:00Z",
    updatedAt: "2023-05-10T14:20:00Z",
    authorId: "user-2",
    author: dummyUsers[1],
    likes: 10,
    commentCount: 2,
  },
  {
    id: "post-3",
    title: "Responsive Design Best Practices",
    content:
      "Creating responsive websites is essential in today's multi-device world. Here are some best practices I've learned over the years:\n\n1. Use relative units like em, rem, and percentages\n2. Implement a mobile-first approach\n3. Use media queries strategically\n4. Test on real devices\n\nFollowing these practices will help ensure your website looks great on all devices.",
    createdAt: "2023-05-05T09:15:00Z",
    updatedAt: "2023-05-05T09:15:00Z",
    authorId: "user-3",
    author: dummyUsers[2],
    likes: 8,
    commentCount: 1,
  },
  {
    id: "post-4",
    title: "My Journey as a Developer",
    content:
      "I started my coding journey five years ago, and it's been an incredible experience. From learning my first programming language to building complex applications, every step has been rewarding.\n\nIn this post, I want to share some of the lessons I've learned along the way and how they've shaped me as a developer.",
    createdAt: "2023-04-28T16:45:00Z",
    updatedAt: "2023-04-28T16:45:00Z",
    authorId: "user-1",
    author: dummyUsers[0],
    likes: 12,
    commentCount: 4,
  },
]

// Dummy comments
export const dummyComments: Comment[] = [
  {
    id: "comment-1",
    content: "Great post! I've been using Next.js for a while now and it's amazing.",
    createdAt: "2023-05-15T11:30:00Z",
    authorId: "user-2",
    author: dummyUsers[1],
    postId: "post-1",
    postTitle: "Getting Started with Next.js",
  },
  {
    id: "comment-2",
    content: "I'm just getting started with Next.js. Do you have any resources you'd recommend?",
    createdAt: "2023-05-15T12:15:00Z",
    authorId: "user-3",
    author: dummyUsers[2],
    postId: "post-1",
    postTitle: "Getting Started with Next.js",
  },
  {
    id: "comment-3",
    content: "TypeScript has been a game-changer for my team as well. The type safety is worth the learning curve.",
    createdAt: "2023-05-10T15:30:00Z",
    authorId: "user-1",
    author: dummyUsers[0],
    postId: "post-2",
    postTitle: "The Power of TypeScript",
  },
  {
    id: "comment-4",
    content: "I completely agree with your responsive design tips. Mobile-first approach has saved me so much time.",
    createdAt: "2023-05-05T10:20:00Z",
    authorId: "user-1",
    author: dummyUsers[0],
    postId: "post-3",
    postTitle: "Responsive Design Best Practices",
  },
  {
    id: "comment-5",
    content: "Your journey is inspiring! I'm just starting out and hope to have a similar experience.",
    createdAt: "2023-04-28T17:30:00Z",
    authorId: "user-2",
    author: dummyUsers[1],
    postId: "post-4",
    postTitle: "My Journey as a Developer",
  },
  {
    id: "comment-6",
    content: "Thanks for sharing your experience. It's always helpful to learn from others' journeys.",
    createdAt: "2023-04-28T18:15:00Z",
    authorId: "user-3",
    author: dummyUsers[2],
    postId: "post-4",
    postTitle: "My Journey as a Developer",
  },
]

