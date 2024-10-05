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
        product.id === item.id
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

  // funtion to remove item
  function removeItem(id) {
    let remove = cart.filter((cartItx) => cartItx.id !== id);
    setCart(remove);
  }

  const calcTotalPrice = cart.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

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
                  calcTotalPrice={calcTotalPrice}
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
