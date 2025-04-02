import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Home() {
  const [newReleases, setNewReleases] = useState([]);
  const [forYouBooks, setForYouBooks] = useState([]);
  const [friendsBooks, setFriendsBooks] = useState([]);

  useEffect(() => {
    // Fetch new releases
    async function fetchBooks() {
    //   const { data: books, error } = await supabase
    //     .from('books')
    //     .select('*')
    //     .order('created_at', { ascending: false })
    //     .limit(5); // Adjust to fetch the latest books
    //   if (!error) setNewReleases(books);

      // Fetch random "For You" books (you can adjust logic)
      const { data: randomBooks, error: randomError } = await supabase
      .from('books')
      .select('title, description, averageratings(average)')
      .limit(3);

      if (!randomError) setForYouBooks(randomBooks);

      // Fetch books your friends have reviewed (you'll need to connect users to friends somehow)
    //   const { data: friendsBooksData, error: friendsError } = await supabase
    //     .from('reviews')
    //     .select('books(title, author)')
    //     .eq('friend', 'current_user_id'); // Replace with actual user logic
    //   if (!friendsError) setFriendsBooks(friendsBooksData);
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>New Releases</h2>
      {newReleases.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}

      <h2>For You</h2>
      {forYouBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}

      <h2>Your Friends Enjoyed</h2>
      {friendsBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
