import MainLayout from "@/app/Layouts/basicLayout"
import PostList from "@/app/Components/Posts/PostList"
import { dummyPosts } from "@/app/lib/dummy-data"
import { Typography, Box } from "@mui/material"

export default function MyPostsPage() {
  // Filter posts to only show user's posts (using dummy data for now)
  const myPosts = dummyPosts.filter((post) => post.authorId === "user-1")

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 8 }}>
          My Posts
        </Typography>
        <PostList posts={myPosts} />
      </Box>
    </MainLayout>
  )
}

