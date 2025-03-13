import { Card, CardContent, Typography, Avatar, Box, Divider, Chip } from "@mui/material"
import { formatDistanceToNow } from "date-fns"
import MessageIcon from "@mui/icons-material/Message"
import FavoriteIcon from "@mui/icons-material/Favorite"
import type { Post } from "@/app/lib/types"

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 3 }}>{post.author.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {post.author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
          {post.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 6, whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Chip icon={<FavoriteIcon fontSize="small" />} label={post.likes} variant="outlined" size="small" />
            <Chip icon={<MessageIcon fontSize="small" />} label={post.commentCount} variant="outlined" size="small" />
          </Box>

          <Typography variant="caption" color="text.secondary">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

