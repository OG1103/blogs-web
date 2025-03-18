import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Container, styled, Button } from "@mui/material";
import { motion } from "framer-motion";
import LoginForm from "@/app/Components/Auth/LoginForm";
import SignupForm from "@/app/Components/Auth/SignUpForm";
import ForgotPasswordDialog from "@/app/Components/Auth/ForgetPassword";
import ResetPasswordForm from "@/app/Components/Auth/ResetPasswordForm";

const MotionContainer = styled(motion.div)({
  width: "100%",
});

const MotionItem = styled(motion.div)({
  width: "100%",
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [instance,setInstance] = useState("");

  useEffect(() => {
    // Fetch the instance-info.json file
    fetch('/instance-info.json')
      .then((response) => response.json())
      .then((data) => {
        setInstance(data["uniqueId"]);
      })
      .catch((error) => {
        console.error('Error fetching instance info:', error);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 12,
      }}
    >
      <MotionContainer initial="hidden" animate="visible" variants={containerVariants}>
        <MotionItem variants={itemVariants}>
          <Typography variant="h3" component="h1" align="center" sx={{ mb: 8, fontWeight: "bold" }}>
            {`Share Your Thoughts - ${instance}` }
          </Typography>
        </MotionItem>

        <MotionItem variants={itemVariants}>
          <Card sx={{ boxShadow: 5 }}>
            <CardContent sx={{ p: 6 }}>
              {resetEmail ? (
                <ResetPasswordForm email={resetEmail} onSuccess={() => setResetEmail(null)} />
              ) : isLogin ? (
                <>
                  <LoginForm />
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => setIsForgotPasswordOpen(true)}
                      sx={{ color: "primary.main", fontSize: "0.875rem" }}
                    >
                      Forgot Password?
                    </Button>
                  </Box>
                </>
              ) : (
                <SignupForm />
              )}

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Box
                    component="button"
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                      color: "primary.main",
                      fontWeight: "medium",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </Box>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </MotionItem>
      </MotionContainer>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </Container>
  );
}
