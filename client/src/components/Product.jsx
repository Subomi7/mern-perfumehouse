import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ratingImg from '../assets/Star.svg';
import products from '../product.json';
import CartContext from '../context/CartContext';
import tick from '../assets/charm_tick.png';
import { useState } from 'react';

const Product = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/product/products');
      const res = await req.json();
      console.log(res);
      setData(res.product)
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  const { handleAddToCart, cart } = useContext(CartContext);
  const isItemInCart = (itemId) =>
    cart.some((product) => product._id === itemId);
  return (
    <>
      <main className='d-flex flex-wrap justify-content-between gap-4 pt-2'>
        {data.map((product) => {
          const { image, _id, title, price, discountPrice, rateCount, rating } =
            product;
          return (
            <Card className='card-container' key={_id}>
              <Card.Img variant='' className='w-100 card-img' src={image} />
              <Card.Body>
                <Card.Title className='card-title'>{title}</Card.Title>
                <div className='d-flex gap-1'>
                  <div className='pt-1'>
                    <img src={ratingImg} alt='rating-img' />
                    <img src={ratingImg} alt='rating-img' />
                    <img src={ratingImg} alt='rating-img' />
                    <img src={ratingImg} alt='rating-img' />
                    <img src={ratingImg} alt='rating-img' />
                  </div>
                  <div className='d-flex gap-2 pt-2'>
                    <p>{rating}</p>
                    <p>({rateCount})</p>
                  </div>
                </div>
                <Card.Text className='d-flex align-items-center gap-2 pt-2'>
                  <span className='card-price'>#{price}</span>
                  <span className='card-discount-price text-decoration-line-through'>
                    #{discountPrice}
                  </span>
                </Card.Text>
                <button
                  disabled={isItemInCart(_id)}
                  className='add-to-cart-btn w-100'
                  onClick={() => handleAddToCart(product)}
                >
                  {isItemInCart(_id) ? (
                    <span>
                      <img src={tick} alt='check' /> Add to Cart
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </Card.Body>
            </Card>
          );
        })}
      </main>
    </>
  );
};

export default Product;
