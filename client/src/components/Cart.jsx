import React, {useContext} from 'react';
import { useState } from 'react';
import carts from '../cart.json';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CartContext from '../context/CartContext';
import toast from 'react-hot-toast'

import ConfirmOrder from './ConfirmOrder';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [modalShow, setModalShow] = useState(false);
  const {cart, removeItem, calcTotalPrice, increaseQuantity, decreaseQuantity} = useContext(CartContext)
  const token = localStorage.getItem("perf-token")
  const navigate = useNavigate()
  function handle(){
    if(token) {
      setModalShow(true)
    }
    if(!token) {
      navigate("/auth/login")
    }
  }
  return (
    <>
      <main className='cart-container d-flex flex-column justify-content-center gap-2'>
        <h2>My Cart Preview</h2>
        <div>
          {cart.length === 0 && (
            <div>
              <h3 className='fs-2 fst-italic text-danger'>
                No item(s) in the cart
              </h3>
              <p className='fw-bolder text-success fs-4'>Keep shopping</p>
            </div>
          )}
        </div>
        {cart.map((cartItem) => {
          const { id, title, price, quantity, image } = cartItem;
          const totalPriceForItem = price * quantity
          return (
            <div
              className='cart-details d-flex gap-5 gap-lg-3 align-items-center cart py-0 my-0'
              key={id}
            >
              <div className='cart-1'>
                <img className='cart-img' src={image} alt='product image' />
              </div>
              <div className='cart-2 d-flex flex-column m-0 p-0'>
                <h4 className='cart-title'>{title}</h4>
                <div className='d-flex gap-2 align-items-center'>
                  <button className='subtract-cart' onClick={() => decreaseQuantity(id)} disabled={quantity <= 1}>-</button>
                  <p className='pt-3 cart-number'>{quantity}</p>
                  <button className='add-cart text-center' onClick={() => increaseQuantity(id)}>+</button>
                </div>
                <div className='d-flex justify-content-between m-0'>
                  <p className='cart-price'>N{totalPriceForItem.toLocaleString()}</p>
                  <button
                    className='remove-cart'
                    onClick={() => removeItem(id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {cart.length > 0 && (
          <>
            <div className='checkout-container'>
              <div className='checkout'>
                <p className='checkout-title'>Sub Total</p>
                <p className='checkout-price'>N{calcTotalPrice.toLocaleString()}</p>
              </div>
              <div className='checkout'>
                <p className='checkout-title'>Delivery</p>
                <p className='checkout-price'>8,000</p>
              </div>
              <div className='checkout'>
                <p className='checkout-title'>Total</p>
                <p className='checkout-price'>
                  N{(calcTotalPrice + 8000).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              className='w-100 checkout-button'
              onClick={handle}
            >
              Confirm Order{' '}
            </button>
          </>
        )}

        <ConfirmOrder show={modalShow} onHide={() => setModalShow(false)} />
      </main>
    </>
  );
};

export default Cart;
