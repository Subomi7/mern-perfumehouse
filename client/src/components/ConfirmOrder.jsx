import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import success from '../assets/Success Icon.png';
import confirmations from '../checkout.json';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ConfirmOrder = (props) => {
  const { cart, calcTotalPrice } = useContext(CartContext);
  return (
    <>
      <Modal
        className='d-flex flex-column custom-modal-width gateway'
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <img className='confirmation' src={success} alt='' />
            <h2 className='confirmation-confirmed'>Order Confirmed</h2>
            <p className='confirmation-title'>We hope you enjoy your order</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.map((cartItem) => {
            const { id, title, price, quantity, image } = cartItem;
            const totalPriceForItem = price * quantity;

            return (
              <div
                className='d-flex justify-content-between align-items-center py-3'
                key={id}
              >
                <div className='d-flex gap-3 align-items-center'>
                  <img className='cart-img' src={image} alt='productname' />
                  <div>
                    <p className='gateway-title'>{title}</p>
                    <div className='d-flex gap-2'>
                      <p className='gateway-quantity'>{quantity}X</p>
                      <p className='gateway-price'>
                      {price}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='gateway-amount'>
                    {totalPriceForItem.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
          <div className='d-flex justify-content-between align-items-center py-3'>
            <p className='gateway-price'>Order Total</p>
            <p className='gateway-total'>{calcTotalPrice.toLocaleString()}</p>
          </div>

          <button className='w-100 gateway-button'>Start New Order</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmOrder;
