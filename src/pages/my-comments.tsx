import MainLayout from "@/app/Layouts/basicLayout";
import CommentList from "@/app/Components/Comment/CommentList";
import { Typography, Box } from "@mui/material";
import { useAuthContext } from "@/app/Providers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCommentsPage() {
  const { user } = useAuthContext();
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    async function getMyComments() {
      try {
        const response = await axios.get("/api/comment/");
        setMyComments(response.data.comments);
      } catch (err) {
        alert(err);
      }
    }

    getMyComments();
  }, []);

  return user ? (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 8 }}
        >
          My Comments
        </Typography>
        <CommentList comments={myComments} showPostInfo={true} />
      </Box>
    </MainLayout>
  ) : null;
}
