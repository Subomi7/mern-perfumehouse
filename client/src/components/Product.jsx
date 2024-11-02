import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ratingImg from '../assets/Star.svg';
import products from '../product.json';
import CartContext from '../context/CartContext';
import tick from '../assets/charm_tick.png';

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const req = await fetch(
        'https://mern-perfumehouse-2.onrender.com/api/product/products'
      );
      const res = await req.json();
      setData(res.product);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
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
        {isLoading
          ? // Display placeholder card when loading
            Array.from({ length: 3 }).map((_, index) => (
              <Card style={{ width: '18rem' }} key={index}>
                <Card.Img variant='top' src='holder.js/100px180' />
                <Card.Body>
                  <Placeholder as={Card.Title} animation='glow'>
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation='glow'>
                    <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant='primary' xs={6} />
                </Card.Body>
              </Card>
            ))
          : // Display actual product cards when data is loaded
            data.map((product) => {
              const {
                image,
                _id,
                title,
                price,
                discountPrice,
                rateCount,
                rating,
              } = product;
              return (
                <Card className='card-container' key={_id}>
                  <Card.Img variant='' className='w-100 card-img' src={image} />
                  <Card.Body>
                    <Card.Title className='card-title'>{title}</Card.Title>
                    <div className='d-flex gap-1'>
                      <div className='pt-1'>
                        {[...Array(5)].map((_, i) => (
                          <img src={ratingImg} alt='rating-img' key={i} />
                        ))}
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
                          <img src={tick} alt='check' /> Added to Cart
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
