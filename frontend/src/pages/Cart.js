import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    const savedUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (savedUser && savedUser.id) {
      setUserId(savedUser.id);
    }
  }, []);

  const updateCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem('cart', JSON.stringify(nextCart));
  };

  const removeFromCart = (bookId) => {
    const nextCart = cart.filter(item => item.book.id !== bookId);
    updateCart(nextCart);
  };

  const changeQuantity = (bookId, delta) => {
    const nextCart = cart.map(item => {
      if (item.book.id !== bookId) return item;
      const quantity = Math.max(1, item.quantity + delta);
      return { ...item, quantity };
    });
    updateCart(nextCart);
  };

  const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!cart.length) {
      setMessage('Cart is empty');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/orders', {
        userId,
        items: cart.map(item => ({
          bookId: item.book.id,
          quantity: item.quantity
        }))
      });

      setMessage('Order placed successfully!');
      updateCart([]);
    } catch (error) {
      setMessage(error.response?.data || 'Failed to place order');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.book.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.book.title}</h5>
                  <p className="mb-0">Price: ${item.book.price}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changeQuantity(item.book.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changeQuantity(item.book.id, 1)}>+</button>
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.book.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-success mt-2" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
