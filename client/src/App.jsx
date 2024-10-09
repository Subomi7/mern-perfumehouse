import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import NavBar from './layout/NavBar';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { useEffect, useState } from 'react';
const cartItemsFromLocalStoragePerf =
  JSON.parse(localStorage.getItem('cart')) || [];
function App() {
  const [cart, setCart] = useState(cartItemsFromLocalStoragePerf);
  const handleAddToCart = (item) => {
    const isPresent = cart.some((product) => product.id === item.id);
    if (isPresent) {
      const updatedCart = cart.map((product) => {
       return product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      });
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
      console.log([...cart, newItem]);
    }
  };

  // function to increase quantity
  const increaseQuantity = (id) => {
    // console.log("Increasing quantity for product with id:", id);

    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // function to decrease quantity
  const decreaseQuantity = (id) => {
    // console.log('Decreasing quantity for product with id:', id);

    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // funtion to remove item
  function removeItem(id) {
    let remove = cart.filter((cartItx) => cartItx.id !== id);
    setCart(remove);
  }

  const calcTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />}>
            <Route
              path='/'
              element={
                <Home
                  cart={cart}
                  handleAddToCart={handleAddToCart}
                  setCart={setCart}
                  removeItem={removeItem}
                  calcTotalPrice={calcTotalPrice()}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              }
            />
          </Route>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
