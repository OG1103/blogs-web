"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
  Collapse,
  TextField,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
// import MessageIcon from "@mui/icons-material/Message"
// import FavoriteIcon from "@mui/icons-material/Favorite"
import type { Post } from "@/app/lib/types";

interface PostCardProps {
  post: Post;
  showActions?: boolean;
}

export default function PostCard({ post, showActions = true }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  // const [liked, setLiked] = useState(false)

  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
    setExpanded(false);
  };

  // const handleLike = () => {
  //   setLiked(!liked)
  // }

  return (
    <Card
      sx={{ mb: 4, "&:hover": { boxShadow: 3, transition: "box-shadow 0.3s" } }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ mr: 2 }}>{post?.User.firstName.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {`${post?.User.firstName} ${post?.User.lastName} `}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(post?.createdAt ?? ""), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
        </Box>

        <Link href={`/post/${post?.id}`} passHref>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              "&:hover": {
                color: "primary.main",
                transition: "color 0.3s",
              },
              cursor: "pointer",
            }}
          >
            {post?.title}
          </Typography>
        </Link>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post?.description?.length && post.description.length > 200
            ? `${post.description.substring(0, 200)}...`
            : post?.description || ""}
        </Typography>

        {post?.description?.length && post.description.length > 200 && (
          <Link href={`/post/${post.id}`} passHref>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
              }}
            >
              Read more
            </Typography>
          </Link>
        )}
      </CardContent>

      {showActions && (
        <>
          <CardActions sx={{ px: 4, pb: 2 }}></CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ pt: 0 }}>
              <form onSubmit={handleSubmitComment}>
                <TextField
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={!comment.trim()}
                  >
                    Post
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
}
