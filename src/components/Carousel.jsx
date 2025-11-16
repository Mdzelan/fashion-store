import React, {useEffect } from 'react'
import { getData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
const Carousel = () => {
  const { data, fetchAllProducts } = getData()
   const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    fetchAllProducts()
  }, [])
// Next Arrow
const SampleNextArrow = ({ className, style, onClick, products }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: 20, zIndex: 2 }}
      onClick={onClick}
    >
      <AiOutlineArrowRight
        style={{
          // background: "gray",
          // color: "white",
          borderRadius: "50%",
          padding: "10px",
          fontSize: "40px", 
          boxShadow: "0 0 15px rgba(24, 5, 0.6)", // soft red glow
          // transition: "all 0.3s ease",
        }} className='text-gray-900 flex gap-2 items-center justify-center 
                     bg-white/30 backdrop-blur-md border border-white/40 shadow-md 
                     transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:scale-[1.02]'
        // onMouseOver={(e) => (e.currentTarget.style.background = "gray")}
        // onMouseOut={(e) => (e.currentTarget.style.background = "gray")}
      />
    </div>
  );
};

// Prev Arrow
const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: 20, zIndex: 2 }}
      onClick={onClick}
    >
      <AiOutlineArrowLeft
        style={{
          // background: "gray",
          // color: "white",
          borderRadius: "50%",
          padding: "10px",
          fontSize: "40px", 
          boxShadow: "0 0 15px rgba(24, 5, 0.6)", // soft red glow
          // transition: "all 0.3s ease",
        }} className='text-gray-900 flex gap-2 items-center justify-center 
                     bg-white/30 backdrop-blur-md border border-white/40 shadow-md 
                     transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:scale-[1.02]'
        // onMouseOver={(e) => (e.currentTarget.style.background = "gray")}
        // onMouseOut={(e) => (e.currentTarget.style.background = "gray")}
      
      />
    </div>
  );
};



  var settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover:false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow  />,
  };

  return (
    <div>
      <Slider {...settings} >
        {
          data?.slice(0, 7)?.map((item, index) => {
            return <div key={index} className='w-full  bg-linear-to-r from-[#949494] via-[rgb(54,54,54)] to-[#949494] -z-10 md:-ml-12' >
              <div className='flex flex-col lg:flex-row md:flex-row  my-38 md:my-0 lg:my-0 lg:gap-35 md:gap-2 justify-center h-[600px] items-center px-4'>
                <div className='lg:space-y-6 md:space-y-6 space-y-3 flex items-center justify-center flex-col lg:justify-start md:ml-30'>
                  <h3 className='text-black font-semibold font-sans text-sm lg:flex lg:justify-start lg:-ml-35'> New fashion isn’t just about clothes <br /> — it’s a way to express yourself in a fresh new light. ✨<br />
                  A touch of color and a dash of confidence — <br /> that’s what defines New Fashion today. 👗🔥</h3>
                  <h1 className='lg:text-4xl md:text-3xl text-xl font-bold uppercase line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
                  <p className='md:w-[500px] lg:line-clamp-3 md:line-clamp-3 line-clamp-2 text-amber-100 pr-7'>{item.
                    description
                  }</p>
                  <button  onClick={() => navigate(`/products/${item._id}`)} className='text-gray-900 flex gap-2 items-center justify-center 
                     bg-white/30 backdrop-blur-md border border-white/40 shadow-md 
                     transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:scale-[1.02] font-bold  px-3 py-2 rounded-md cursor-pointer mt-2 lg:flex lg:justify-start lg:-ml-100'>Shop Now</button>
                </div>
                <div className="group relative flex justify-center items-center md:w-1/2 mt-10 md:mt-0">
                  <img src={item.image} alt={item.title} className="rounded-full w-[350px] transition-all duration-500  group-hover:scale-110  shadow-2xl shadow-red-400 lg:-mr-30 md:-mr-30" />
                </div>
              </div>
            </div>
          })
        }
        

      </Slider>
      <Category/>
    </div>
  );
};

export default Carousel