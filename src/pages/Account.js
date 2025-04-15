import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Star } from '@mui/icons-material';

function Account() {
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    async function fetchMyReviews() {
      const { data, error } = await supabase
        .from('user_uploaded_books')
        .select('title, rating, comment');

      if (error) {
        console.error("Error fetching your reviews:", error);
      } else {
        setMyReviews(data);
      }
    }

    fetchMyReviews();
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
          <Star key={`empty-${i}`} style={{ color: '#444' }} />
        ))}
      </>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Reviews</h1>
      <div style={styles.reviewColumn}>
        {myReviews.map((review, idx) => (
          <div key={idx} style={styles.reviewCard}>
            <h2 style={styles.title}>{review.title}</h2>
            <div style={styles.stars}>{renderStars(review.rating)}</div>
            <p style={styles.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    marginLeft: '80px', // adjust if you have a sidebar
  },
  header: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  reviewColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  reviewCard: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '12px',
    width: '100%',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.05)',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  stars: {
    display: 'flex',
    gap: '5px',
    marginBottom: '10px',
  },
  comment: {
    fontSize: '0.95rem',
    color: '#ccc',
  },
};

export default Account;
