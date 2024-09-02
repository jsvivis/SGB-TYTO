import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<><AddBook /><BookList /></>} />
        <Route path="/user" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
