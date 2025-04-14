import React, { useState } from "react";
import supabase from "../supabaseClient";
import BookList from "./BookList";


export default function SearchForm() {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const { data, error } = await supabase
      .from("books")
      .select("book_id, title, description")
      .textSearch("title", userInput);

    if (error) {
      console.error("Supabase error:", error);
      setBooks([]);
    } else {
      setBooks(data);
      console.log("Books:", data);

    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Search Database
      </h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Type to search..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Search
        </button>
      </form>

    <div>
        {books.length > 0 ? (
          <>
          <p>Showing Results</p>
          {books.map((book) => (
            <div key={book.book_id} 
            style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <p>{book.title}</p>
            </div>
          ))}
          </>
        ) : (
        <div>
          userInput && <p style={{ color: "#666" }}>No results found. Try these other books.</p>
        <BookList />
        </div>
        )}
      </div>
    </div>
  );
}