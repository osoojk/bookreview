import React, { useState } from "react";
import supabase from "../supabaseClient";
import BookList from "./BookList";

export default function SearchForm() {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const { data, error } = await supabase
      .from("books")
      .select("book_id, title, description")
      .or(`title.ilike.%${userInput}%,description.ilike.%${userInput}%`);

    if (error) {
      console.error("Supabase error:", error);
      setBooks([]);
    } else {
      setBooks(data);
    }
  };

  const styles = {
    container: {
      marginLeft: '80px',
      padding: '20px',
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
    },
    header: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      width: '300px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #444',
      backgroundColor: '#111',
      color: '#fff',
      marginRight: '10px',
    },
    button: {
      padding: '10px 16px',
      fontSize: '1rem',
      backgroundColor: "rgba(255, 64, 129, .35)",
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: '20px',
    },
    bookCard: {
      flex: '0 0 auto',
      width: '300px',
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#111',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Search Database</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type to search..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      <div style={styles.row}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.book_id} style={styles.bookCard}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </div>
          ))
        ) : (
          userInput && (
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: "#999" }}>No results found. Try these other books:</p>
              <BookList />
            </div>
          )
        )}
      </div>
    </div>
  );
}
