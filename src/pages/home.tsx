import MainLayout from "@/app/Layouts/basicLayout";
import PostList from "@/app/Components/Posts/PostList";
import { Typography, Box } from "@mui/material";
import { useAuthContext } from "@/app/Providers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("user", user);
    if (!user) return;
    async function getPosts() {
      try {
        const response = await axios.get("/api/post/");
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
      }
    }

    getPosts();
  }, [user]);
  return user ? (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 8 }}
        >
          Recent Posts
        </Typography>
        <PostList posts={posts} />
      </Box>
    </MainLayout>
  ) : null;
}
