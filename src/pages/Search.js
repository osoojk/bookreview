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
      //.textSearch("description", userInput);
      .or(`title.ilike.%${userInput}%,description.ilike.%${userInput}%`);

    if (error) {
      console.error("Supabase error:", error);
      setBooks([]);
    } else {
      setBooks(data);
      console.log("Books:", data);

    }
  };

  function randomColor() {
    var myArray = ["#8594AB", "#9FBBBA", "#FACDA7", "#EDA19D", "#CF8299", "#8B6B96"]; 
    var rand = myArray[(Math.random() * myArray.length) | 0]
    return rand;
    //return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
  }

  return (
      <div style={{ 
        width: "100%",
        margin: "0 auto",
        padding: "2rem",
        boxSizing: "border-box",
        backgroundColor: "black",
        color: "white"
        }}>

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

  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1rem",
      width: "1050px",
      boxSizing: "border-box",
    }}
  >
    {books.length > 0 ? (
      books.map((book) => (
        <div
          key={book.book_id}
          style={{
            width: "200px", // Fixed width
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: randomColor(),
            minHeight: "150px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {book.title}
          </p>
          <p style={{ fontSize: "0.9rem"}}>{book.description}</p>
        </div>
      ))
    ) : (
      userInput && (
        <div style={{ gridColumn: "1 / -1" }}>
          <p style={{ color: "#666"}}>No results found. Try these other books:</p>
          <div>
            <BookList/>
          </div>
        </div>
      )
    )}
  </div>
</div>

</div>
</div>

  );
}