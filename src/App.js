import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Genre from './pages/Genre';
import { maxWidth } from '@mui/system';
import AddReview from './pages/AddReview';
import Account from './pages/Account';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/addreview" element={<AddReview />} />
          <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;

