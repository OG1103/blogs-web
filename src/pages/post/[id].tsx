"use client"

import { useRouter } from "next/router"
import MainLayout from "@/app/Layouts/basicLayout"
import PostDetail from "@/app/Components/Posts/PostDetail"
import CommentList from "@/app/Components/Comment/CommentList"
import CommentForm from "@/app/Components/Comment/CommentForm"
import { dummyPosts, dummyComments } from "@/app/lib/dummy-data"
import { Typography, Box } from "@mui/material"

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query

  // Handle case when id is undefined (during SSR) or an array
  const postId = typeof id === "string" ? id : id?.[0] || ""

  const post = dummyPosts.find((post) => post.id === postId) || dummyPosts[0]
  const comments = dummyComments.filter((comment) => comment.postId === postId)

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <PostDetail post={post} />
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 4 }}>
            Comments
          </Typography>
          <CommentForm postId={postId} />
          <Box sx={{ mt: 6 }}>
            <CommentList comments={comments} />
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

