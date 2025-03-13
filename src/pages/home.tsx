import MainLayout from "@/app/Layouts/basicLayout"
import PostList from "@/app/Components/Posts/PostList"
import { dummyPosts } from "@/app/lib/dummy-data"
import { Typography, Box } from "@mui/material"

export default function HomePage() {
  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 8 }}>
          Recent Posts
        </Typography>
        <PostList posts={dummyPosts} />
      </Box>
    </MainLayout>
  )
}

