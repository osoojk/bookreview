import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';

function Genre() {
    const genres = [
        { key: 'fiction', label: 'Fiction' },
        { key: 'nonfiction', label: 'Nonfiction' },
        { key: 'science', label: 'Science' },
        { key: 'tech', label: 'Tech' },
      ];
  const [genreBooks, setGenreBooks] = useState({});

  useEffect(() => {
    async function fetchGenreBooks() {
      const genreData = {};

      for (const genre of genres) {
        const { data, error } = await supabase
          .from('books')
          .select('book_id, title, description, genre, averageratings (average)')
          .eq('genre', genre.key)
          .limit(10);
      
        if (!error && data) {
          genreData[genre.label] = data;
        }
      }

      setGenreBooks(genreData);
    }

    fetchGenreBooks();
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
      <h1>Browse by Genre</h1>
      {Object.entries(genreBooks).map(([genre, books]) => (
        <div key={genre} style={styles.genreSection}>
          <h2>{genre}</h2>
          <div style={styles.row}>
            {books.map(book => (
              <div key={book.book_id} style={styles.bookCard}>
                <h3>{book.title}</h3>
                <div style={styles.stars}>
                  {renderStars(book.averageratings?.average || 0)}
                </div>
                <p>{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    marginLeft: '80px', // adjust for navbar
  },
  genreSection: {
    marginBottom: '40px',
  },
  row: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '10px',
  },
  bookCard: {
    minWidth: '200px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  stars: {
    display: 'flex',
    gap: '4px',
  },
};

export default Genre;
