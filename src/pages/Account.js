import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';
import { maxWidth, width } from '@mui/system';

function Account() {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    async function fetchUserBooks() {
      const { data, error } = await supabase
        .from('user_uploaded_books')
        .select('title, rating, description');

      if (error) {
        console.error('Error fetching reviewed books:', error);
      } else {
        setUserBooks(data);
      }
    }

    fetchUserBooks();
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
      <h1>Your Reviews</h1>
      {userBooks.map((book, index) => (
        <div key={index} style={styles.reviewCard}>
          <h3>{book.title}</h3>
          <div style={styles.stars}>{renderStars(book.rating)}</div>
          <p><strong>Comment:</strong> {book.comment}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    color: 'white',
    backgroundColor: 'black',
    minHeight: '100vh',
    marginLeft: '80px', 
  },
  reviewCard: {
    backgroundColor: '#1e1e1e',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #444',
    width: '80vw',
  },
  stars: {
    display: 'flex',
    gap: '5px',
    margin: '10px 0',
  },
};

export default Account;
