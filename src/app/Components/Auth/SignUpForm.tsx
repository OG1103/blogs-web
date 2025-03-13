import type React from "react";

import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { useAuthContext } from "@/app/Providers/AuthContext";
import { AxiosError } from "axios";

export default function SignupForm() {
  const authContext = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authContext.register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      alert("User Created, Now Please Login");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data) {
        console.log(error.response.data);
        alert(error.response.data);
      } else {
        console.error(err);
        alert("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
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
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
      </Box>
    </form>
  );
}
