"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, TextField, Button, Box, Avatar, CircularProgress } from "@mui/material"

export default function PostForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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
      setFormData({ title: "", content: "" })
      // Here you would normally update the posts list
    }, 1000)
  }

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 2 }}>U</Avatar>
          <Box sx={{ fontSize: "1.125rem", fontWeight: 500 }}>Share your thoughts...</Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            required
          />

          <TextField
            placeholder="What's on your mind?"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 3 }}
            required
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
            >
              {isLoading ? <CircularProgress size={24} /> : "Post"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

