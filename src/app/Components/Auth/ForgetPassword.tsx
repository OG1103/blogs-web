import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import ResetPasswordForm from "./ResetPasswordForm"; // Import Reset Password Form

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordDialog({ open, onClose }: ForgotPasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isResetStage, setIsResetStage] = useState(false); // Track reset stage

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/user/forgot-password", { email });
      alert("Reset code sent! Please enter it below.");
      setIsResetStage(true); // Switch to reset password stage
    } catch (err) {
      const error = err as AxiosError<{ err?: { message?: string } }>;
      alert(error.response?.data?.err?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isResetStage ? "Reset Password" : "Forgot Password"}</DialogTitle>
      <DialogContent>
        {!isResetStage ? (
          // Show Forgot Password Form
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                sx={{ height: 44 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Send Reset Code"}
              </Button>
            </Box>
          </form>
        ) : (
          // Show Reset Password Form
          <ResetPasswordForm email={email} onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
