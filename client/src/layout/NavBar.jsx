import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import navLogo from '../assets/Group 9283.svg';
import dropDownIcon from '../assets/arrow-down.svg';
import LogOut from '../components/LogOut';
import arrowUp from '../assets/keyboard_arrow_up.svg';
import OffCanvas from '../components/OffCanvas';
import CartContext from '../context/CartContext';

const NavBar = () => {
  const [isReaveal, setIsReaveal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(CartContext);
  const token = localStorage.getItem('perf-token');
  function toggleIsRevealed() {
    isReaveal ? setIsReaveal(false) : setIsReaveal(true);
  }
  return (
    <>
      <nav className='container d-flex justify-content-between py-4 align-items-center'>
        <div className='d-flex gap-2'>
          <img src={navLogo} alt='' />
          <h2 className='d-none d-lg-block'>Perfume House</h2>
        </div>
        <div className='d-none d-md-flex gap-4'>
          {token ? (
            <>
              <div className='position-relative'>
                <h1 className=''>
                  {`Hi, ${user?.firstName} ${user?.lastName}`}
                  <span className='ms-3'>
                    {isReaveal ? (
                      <img
                        src={arrowUp}
                        alt='dropdown'
                        role='button'
                        onClick={toggleIsRevealed}
                      />
                    ) : (
                      <img
                        src={dropDownIcon}
                        alt='dropdown'
                        role='button'
                        onClick={toggleIsRevealed}
                      />
                    )}
                  </span>
                </h1>
                <div className='position-absolute end-0'>
                  {isReaveal && <LogOut />}
                </div>
              </div>
            </>
          ) : (
            <>
              <button className='login-btn'>
                <Link
                  className='text-decoration-none login-link'
                  to='/auth/login'
                >
                  Log In
                </Link>
              </button>
              <button className='sign-up-btn'>
                <Link
                  className='text-decoration-none sign-up-link'
                  to='/auth/signup'
                >
                  Sign Up
                </Link>
              </button>
            </>
          )}
        </div>

        <div className='d-md-none'>
          {['top'].map((placement, idx) => (
            <OffCanvas key={idx} placement={placement} name={placement} />
          ))}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
