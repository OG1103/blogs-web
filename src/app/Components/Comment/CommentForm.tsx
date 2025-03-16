import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(content,postId);
    try {
      await axios.post("/api/comment/", { content, postId });
      alert("Comment added");
    } catch (err) {
      alert(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Avatar sx={{ mr: 3, mt: 1 }}>U</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Write a comment..."
                value={content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                required
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={isLoading || !content.trim()}
                >
                  {isLoading ? <CircularProgress size={20} /> : "Comment"}
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
