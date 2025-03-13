import MainLayout from "@/app/Layouts/basicLayout"
import CommentList from "@/app/Components/Comment/CommentList"
import { dummyComments } from "@/app/lib/dummy-data"
import { Typography, Box } from "@mui/material"

export default function MyCommentsPage() {
  // Filter comments to only show user's comments (using dummy data for now)
  const myComments = dummyComments.filter((comment) => comment.authorId === "user-1")

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 8 }}>
          My Comments
        </Typography>
        <CommentList comments={myComments} showPostInfo={true} />
      </Box>
    </MainLayout>
  )
}

