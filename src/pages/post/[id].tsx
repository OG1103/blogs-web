import { useRouter } from "next/router";
import MainLayout from "@/app/Layouts/basicLayout";
import PostDetail from "@/app/Components/Posts/PostDetail";
import CommentList from "@/app/Components/Comment/CommentList";
import CommentForm from "@/app/Components/Comment/CommentForm";
import { Typography, Box } from "@mui/material";
import { useAuthContext } from "@/app/Providers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  // Handle case when id is undefined (during SSR) or an array
  const[postId,setPostId] = useState(0);
  useEffect(() => {
    if (!user) return;

    async function getPost() {
      try {
        const response = await axios.get(`api/post/${id}`);
        setPost(response.data.post);
        setPostId(response.data.post.id);
        console.log("post", response.data.post)
      } catch (err) {
        console.log(err);
      }
    }
    async function getPostComments() {
      try {
        const response = await axios.get(`api/comment/${id}`);
        setComments(response.data.comments);
      } catch (err) {
        console.log(err);
      }
    }
     getPost();
     getPostComments();
  }, [user,id]);

  return user ? (
    <MainLayout>
      {post && comments && <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <PostDetail post={post} />
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            Comments
          </Typography>
          <CommentForm postId={postId} />
          <Box sx={{ mt: 6 }}>
            <CommentList comments={comments} />
          </Box>
        </Box>
      </Box>}
    </MainLayout>
  ) : null;
}
