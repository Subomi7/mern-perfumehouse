import React from 'react';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import menuIcon from '../assets/ci_hamburger-lg.svg';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import LogOut from './LogOut';
import arrowUp from '../assets/keyboard_arrow_up.svg';
import dropDownIcon from '../assets/arrow-down.svg';

const OffCanvas = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const [isReaveal, setIsReaveal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('perf-token');
  const { user } = useContext(CartContext);

  function toggleIsRevealed() {
    isReaveal ? setIsReaveal(false) : setIsReaveal(true);
  }

  return (
    <>
      <div onClick={handleShow}>
        <img src={menuIcon} alt='hamburger' />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Body>
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
                <div className='position-absolute en-0'>
                  {isReaveal && <LogOut />}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='d-flex flex-column container mt-3 gap-3'>
                <button className='login-btn w-100'>
                  <Link
                    className='text-decoration-none login-link'
                    to='/auth/login'
                  >
                    Log In
                  </Link>
                </button>
                <button className='sign-up-btn w-100'>
                  <Link
                    className='text-decoration-none sign-up-link'
                    to='/auth/signup'
                  >
                    Sign Up
                  </Link>
                </button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;

// {token ? (
//   <>
//   <div className='position-relative'>
//     <h1 className=''>
//       {`Hi, ${user?.firstName} ${user?.lastName}`}
//       <span className='ms-3'>
//         {isReaveal ? (
//           <img
//             src={arrowUp}
//             alt='dropdown'
//             role='button'
//             onClick={toggleIsRevealed}
//           />
//         ) : (
//           <img
//             src={dropDownIcon}
//             alt='dropdown'
//             role='button'
//             onClick={toggleIsRevealed}
//           />
//         )}
//       </span>
//     </h1>
//     <div className='position-absolute end-0'>
//       {isReaveal && <LogOut />}
//     </div>
//   </div>
// </>
// ) : (
// <>
//   <button className='login-btn'>
//     <Link
//       className='text-decoration-none login-link'
//       to='/auth/login'
//     >
//       Log In
//     </Link>
//   </button>
//   <button className='sign-up-btn'>
//     <Link
//       className='text-decoration-none sign-up-link'
//       to='/auth/signup'
//     >
//       Sign Up
//     </Link>
//   </button>
// </>
// )}
