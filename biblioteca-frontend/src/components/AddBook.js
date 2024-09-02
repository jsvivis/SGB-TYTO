import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/books', { title, author, year, isbn })
      .then(() => {
        setTitle('');
        setAuthor('');
        setYear('');
        setIsbn('');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          required
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
