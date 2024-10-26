import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const LogOut = () => {
  const {logOut} = useContext(CartContext);
  return (
    <>
      <main className='log-out border border-2 p-3'>
        <h4 role='button' onClick={logOut}>
          Log Out
        </h4>
      </main>
    </>
  );
};

export default LogOut;
