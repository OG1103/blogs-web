import { Card, CardContent, Typography, Avatar, Box, Link as MuiLink } from "@mui/material"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Comment } from "@/app/lib/types"

interface CommentCardProps {
  comment: Comment
  showPostInfo?: boolean
}

export default function CommentCard({ comment, showPostInfo = false }: CommentCardProps) {
  console.log(comment);
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ mr: 3 }}>{comment.User.firstName.charAt(0)}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {`${comment.User.firstName} ${comment.User.lastName}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {comment.content}
            </Typography>

            {showPostInfo && (
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "grey.100" }}>
                <Typography variant="caption" color="text.secondary">
                  Commented on:
                  <MuiLink component={Link} href={`/post/${comment.postId}`} sx={{ ml: 1 }}>
                    {comment.Post?.title}
                  </MuiLink>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

