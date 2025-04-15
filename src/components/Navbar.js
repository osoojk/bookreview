import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AddBox, Settings, Person, LibraryBooks } from '@mui/icons-material';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" title="Home" style={styles.iconLink}>
        <Home fontSize="medium" style={styles.icon} />
      </Link>
      <Link to="/add-review" title="Add Review" style={styles.iconLink}>
        <AddBox fontSize="medium" style={styles.icon} />
      </Link>
      <Link to="/search" title="Search" style={styles.iconLink}>
        <Search fontSize="medium" style={styles.icon} />
      </Link>
      <Link to="/genre" title="Genre" style={styles.iconLink}>
        <LibraryBooks fontSize="medium" style={styles.icon} />
      </Link>
      <Link to="/account" title="Account" style={styles.iconLink}>
        <Person fontSize="medium" style={styles.icon} />
      </Link>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '80px',
    backgroundColor: '#1f2937', // Tailwind's gray-900
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '24px',
    gap: '32px',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 50,
  },
  iconLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  icon: {
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
};

export default Navbar;
