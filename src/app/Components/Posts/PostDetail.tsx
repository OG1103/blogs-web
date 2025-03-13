import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
// import { formatDistanceToNow } from "date-fns";

import type { Post } from "@/app/lib/types";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 3 }}>{post?.User.firstName.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {`${post?.User.firstName} ${post?.User.lastName} `}{" "}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {/* {formatDistanceToNow(new Date(post?.createdAt ?? ""), {
                addSuffix: true,
              })} */}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          {post?.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 6, whiteSpace: "pre-line" }}>
          {post?.description}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <Typography variant="caption" color="text.secondary">
           {new Date(post?.createdAt ?? "").toLocaleDateString()}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
}
