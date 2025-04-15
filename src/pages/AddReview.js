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
  Alert,
} from "@mui/material";

export default function AddReview() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    rating: "",
    comment: "",
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
        comment: "",
      });
    }

    setLoading(false);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          backgroundColor: "#111",
          color: "white",
          fontFamily: "Inter, Roboto, sans-serif",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Add a Book Review
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2.5}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            style={{ backgroundColor: "#222", color: "white" }}
        />

          </Box>
          <Box mb={2.5}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              style={{ backgroundColor: "#222", color: "white" }}
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              style={{ backgroundColor: "#222", color: "white" }}
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              variant="outlined"
              multiline
              rows={4}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              style={{ backgroundColor: "#222", color: "white" }}
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              fullWidth
              label="Rating (1-5)"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              variant="outlined"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              InputLabelProps={{ style: { color: "white" } }}
              style={{ backgroundColor: "#222", color: "white" }}
              InputProps={{ style: { color: "white" } }}
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              fullWidth
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              variant="outlined"
              multiline
              rows={4}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              style={{ backgroundColor: "#222", color: "white" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{
              backgroundColor: "rgba(255, 64, 129, .35)",
              color: "white",
              padding: "1rem",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>

        {message && (
          <Box mt={2}>
            <Alert severity={message.startsWith("Error") ? "error" : "success"}>
              {message}
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
