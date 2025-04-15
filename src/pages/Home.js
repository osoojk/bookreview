import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';

function Home() {
  const [newReleases, setNewReleases] = useState([]);
  const [forYouBooks, setForYouBooks] = useState([]);
  const [friendsBooks, setFriendsBooks] = useState([]);
  const [highlyRatedBooks, setHighlyRatedBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data: allBooks, error } = await supabase
      .from('books')
      .select('book_id, title, description, averageratings(average)');

      if (error || !allBooks) {
        console.error("Error fetching books:", error);
        return;
      }
  
      const booksWithRatings = allBooks.filter(book => book.averageratings?.average !== null);

      const shuffled = [...booksWithRatings].sort(() => Math.random() - 0.5);
      setForYouBooks(shuffled.slice(0, 3)); 

 
      const highlyRated = booksWithRatings.filter(book => book.averageratings.average >= 4);
      const shuffledHigh = [...highlyRated].sort(() => Math.random() - 0.5);
      setHighlyRatedBooks(shuffledHigh.slice(0, 3));
  }

  fetchBooks();
}, []);


  const renderStars = (rating) => {
    const fullStars = rating; 
    const emptyStars = 5 - fullStars;

    const filledStars = Array(fullStars).fill().map((_, index) => (
      <Star key={`full-${index}`} style={{ color: '#ffd700' }} />
    ));

    const emptyStarsArr = Array(emptyStars).fill().map((_, index) => (
      <Star key={`empty-${index}`} style={{ color: '#e0e0e0' }} />
    ));

    return [...filledStars, ...emptyStarsArr];
  };


  return (
    <div style={styles.container}>
      <h1>Home</h1>

      <h2>For You</h2>
      {forYouBooks.map((book) => (
        <div key={book.book_id} style={styles.bookItem}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>

          {/* Display rating stars */}
          <div style={styles.stars}>
            {renderStars(book.averageratings ? book.averageratings.average : 0)}
          </div>
        </div>
      ))}

      <h2>Highly Rated</h2>
      {highlyRatedBooks.map((book) => (
        <div key={book.book_id} style={styles.bookItem}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <div style={styles.stars}>
            {renderStars(book.averageratings?.average || 0)}
          </div>
        </div>
      ))}

    </div>
    
  );
}

const styles = {
  container: {
    marginLeft: '80px', // Adjust for navbar space
    padding: '20px',
    color: "white"
  },
  bookItem: {
    marginBottom: '20px',
  },
  stars: {
    display: 'flex',
    gap: '5px', // Space between stars
  },
};

export default Home;
