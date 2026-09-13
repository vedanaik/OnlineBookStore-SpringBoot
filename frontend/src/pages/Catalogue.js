import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Catalogue() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const addToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.book.id === book.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { book, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Book added to cart');
  };

  return (
    <div>
      <h2 className="mb-4">Book Catalogue</h2>
      <div className="row">
        {books.length === 0 ? (
          <p>No books available yet. Add books to MySQL database or via API.</p>
        ) : (
          books.map(book => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card h-100">
                <img src={book.imageUrl || 'https://via.placeholder.com/150'} className="card-img-top" alt={book.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="fw-bold">${book.price}</p>
                  <button className="btn btn-primary w-100" onClick={() => addToCart(book)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Catalogue;