"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import { TextField, Button, Box, CircularProgress } from "@mui/material"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading} sx={{ height: 44 }}>
          {isLoading ? <CircularProgress size={24} /> : "Log In"}
        </Button>
      </Box>
    </form>
  )
}

