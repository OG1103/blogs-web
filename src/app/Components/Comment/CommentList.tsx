import { Box, Typography } from "@mui/material"
import CommentCard from "./CommentCrad"
import type { Comment } from "@/app/lib/types"

interface CommentListProps {
  comments: Comment[]
  showPostInfo?: boolean
}

export default function CommentList({ comments, showPostInfo = false }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No comments yet. Be the first to comment!
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} showPostInfo={showPostInfo} />
      ))}
    </Box>
  )
}

