import React, { useState } from "react";
import supabase from "../supabaseClient";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";

export default function BookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    rating: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("user_uploaded_books").insert([formData]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Book successfully added!");
      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
        rating: "", 
        comment: ""
      });
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add a Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Rating (1-5)"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              inputProps={{ min: 1, max: 5 }}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
        {message && (
          <Box mt={2}>
            <Alert severity={message.startsWith("Error") ? "error" : "success"}>{message}</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
