import MainLayout from "@/app/Layouts/basicLayout";
import PostList from "@/app/Components/Posts/PostList";
import { Typography, Box } from "@mui/material";
import { useAuthContext } from "@/app/Providers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    async function getMyPosts() {
      try {
        const response = await axios.get("/api/post/user");
        setMyPosts(response.data.posts);
      } catch (err) {
        alert(err);
      }
    }

    getMyPosts();
  }, []);

  const { user } = useAuthContext();
  return user ? (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 8 }}
        >
          My Posts
        </Typography>
        <PostList posts={myPosts} />
      </Box>
    </MainLayout>
  ) : null;
}
