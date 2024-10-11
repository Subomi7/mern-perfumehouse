import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();
const cartItemsFromLocalStoragePerf =
  JSON.parse(localStorage.getItem('cart')) || [];

export const CartProvider = ({children}) => {
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

  const calcTotalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return(
  <CartContext.Provider value = {{
    handleAddToCart,
    cart, setCart,
    increaseQuantity,
    decreaseQuantity,
    calcTotalPrice,
    removeItem,

  }}>
    {children}
  </CartContext.Provider>
  ) 
};

export default CartContext;
