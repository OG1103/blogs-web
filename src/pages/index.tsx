"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, Typography, Box, Container, styled } from "@mui/material"
import { motion } from "framer-motion"
import LoginForm from "@/app/Components/Auth/LoginForm"
import SignupForm from "@/app/Components/Auth/SignUpForm"

const MotionContainer = styled(motion.div)({
  width: "100%",
})

const MotionItem = styled(motion.div)({
  width: "100%",
})

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

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
            Share Your Thoughts
          </Typography>
        </MotionItem>

        <MotionItem variants={itemVariants}>
          <Card sx={{ boxShadow: 5 }}>
            <CardContent sx={{ p: 6 }}>
              {isLogin ? <LoginForm /> : <SignupForm />}

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
    </Container>
  )
}

