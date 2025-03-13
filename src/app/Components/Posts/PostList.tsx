import { Box } from "@mui/material"
import PostCard from "./PostCard"
import PostForm from "./PostForm"
import type { Post } from "@/app/lib/types"

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <Box>
      <PostForm />
      <Box sx={{ mt: 8 }}>
        {posts.map((post) => (
          <PostCard key={post?.id} post={post} />
        ))}
      </Box>
    </Box>
  )
}

