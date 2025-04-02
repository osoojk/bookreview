import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      let { data, error } = await supabase
        .from('books')
        .select('title, author, genre, description');
  
      if (error) {
        console.log("Error fetching books:", error);  // Log full error
      } else {
        console.log("Fetched books:", data);
        setBooks(data);
      }
    }
    fetchBooks();
  }, []);

  console.log("Books state:", books); 

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.title}</h2>
            <p>{book.genre}</p>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
