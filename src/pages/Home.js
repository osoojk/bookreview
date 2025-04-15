import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';

function Home() {
  const [forYouBooks, setForYouBooks] = useState([]);
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
      setForYouBooks(shuffled.slice(0, 5)); 

      const highlyRated = booksWithRatings.filter(book => book.averageratings.average >= 4);
      const shuffledHigh = [...highlyRated].sort(() => Math.random() - 0.5);
      setHighlyRatedBooks(shuffledHigh.slice(0, 5));
    }

    fetchBooks();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.round(rating); 
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <Star key={`full-${i}`} style={{ color: '#ffd700' }} />
        ))}
        {Array(emptyStars).fill().map((_, i) => (
          <Star key={`empty-${i}`} style={{ color: '#e0e0e0' }} />
        ))}
      </>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Home</h1>

      <h2 style={styles.sectionHeader}>For You</h2>
      <div style={styles.row}>
        {forYouBooks.map((book) => (
          <div key={book.book_id} style={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <div style={styles.stars}>
              {renderStars(book.averageratings?.average || 0)}
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionHeader}>Highly Rated</h2>
      <div style={styles.row}>
        {highlyRatedBooks.map((book) => (
          <div key={book.book_id} style={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <div style={styles.stars}>
              {renderStars(book.averageratings?.average || 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  sectionHeader: {
    marginTop: '30px',
    marginBottom: '10px',
    fontSize: '1.5rem',
  },
  row: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '10px',
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
  stars: {
    display: 'flex',
    gap: '4px',
  },
};

export default Home;
