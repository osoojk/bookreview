import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';
import { fontSize } from '@mui/system';

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
                <p style={styles.description}>{book.description}</p>
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
        padding: '10px 20px',
        marginLeft: '80px',
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
    },
    genreSection: {
        marginBottom: '20px',
        padding: '15px',
        borderRadius: '10px',
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '10px',
        scrollbarWidth: 'none',
    },
    bookCard: {
        flex: '0 0 auto',
        width: '300px',
        border: '1px solid #444',
        borderRadius: '6px',
        padding: '10px',
        backgroundColor: '#111',
        color: '#fff',
      },
    stars: {
      display: 'flex',
      gap: '4px',
    },
  };

export default Genre;
