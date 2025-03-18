import type React from "react";
import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import axios, { AxiosError } from "axios";

interface ResetPasswordFormProps {
  email: string;
  onSuccess: () => void;
}

export default function ResetPasswordForm({ email, onSuccess }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    confirmationCode: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      confirmationCode: formData.confirmationCode,
      newPassword: formData.newPassword,
    };
    console.log(data);
    try {
      await axios.post("/api/user/reset-password", data);
      alert("Password reset successfully!");
      onSuccess();
    } catch (err) {
      const error = err as AxiosError<{ err?: { message?: string } }>;
      alert(error.response?.data?.err?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Email"
          type="text"
          name="email"
          value={email}
          fullWidth
          required
          variant="outlined"
          disabled
        />
        <TextField
          label="Confirmation Code"
          type="text"
          name="confirmationCode"
          value={formData.confirmationCode}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
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
          {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
      </Box>
    </form>
  );
}
