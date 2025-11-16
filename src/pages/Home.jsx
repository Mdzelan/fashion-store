import React from 'react'
import Carousel from '../components/Carousel';
import MidBanner from '../components/MidBanner';
import Features from '../components/Features';
import Products from'../pages/Products';
const Home = () => {
  return (
   <>
   <Carousel/>
   <MidBanner/>
   <Products/>
   <Features/>
   </>
  );
};


export default Home