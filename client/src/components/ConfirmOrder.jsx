import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import success from '../assets/Success Icon.png';
import confirmations from '../checkout.json';
import { Link } from 'react-router-dom';

const ConfirmOrder = (props) => {
  return (
    <>
      <Modal
        className='d-flex flex-column w-100 gateway'
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
          {confirmations.map((confirmation) => {
            const { image, title, quatity, price, amount } = confirmation;
            return (
              <div className='d-flex justify-content-between align-items-center py-3'>
                <div className='d-flex gap-3 align-items-center'>
                  <img src={image} alt='productname' />
                  <div>
                    <p className='gateway-title'>{title}</p>
                    <div className='d-flex gap-2'>
                      <p className='gateway-quantity'>{quatity}</p>
                      <p className='gateway-price'>{price}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='gateway-amount'>{amount}</p>
                </div>
              </div>
            );
          })}
          <div className='d-flex justify-content-between align-items-center py-3'>
            <p className='gateway-price'>Order Total</p>
            <p className='gateway-total'>N5,600</p>
          </div>

          <button className='w-100 gateway-button'>Start New Order</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmOrder;
