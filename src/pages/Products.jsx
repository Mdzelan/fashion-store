import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext';
import FilterSection from '../components/FilterSection';
import Loading from'../assets/Loading3.webm'
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Lottie from 'lottie-react';
import notfound from "../assets/notfound.json"
import MobilFilter from '../components/MobilFilter';

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const[priceRange, setPriceRange] = useState([0, 1000])
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(()=> {
    fetchAllProducts()
    window.scrollTo(0,0)
  },[])

  const handleCategoryChange =(e)=>{
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }
  const handleBrandeChange =(e)=>{
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectedPage)=> {
    setPage(selectedPage)
    window.scrollTo(0,0)
  }

  


    
const filtereData = data?.filter((item) =>
  item?.title?.toLowerCase().includes(search.toLowerCase()) &&
  (category === "All" || item.category === category) &&
  (brand === "All" || item.brand === brand) &&
  item.price >= priceRange[0] && item.price <= priceRange[1]
);

  const dynamicPage = Math.ceil(filtereData?.length / 8)

  return (
    <div className='ml-5'>
       <div className='max-w-[1440px] mx-auto px-2 mb-10 '>
        <MobilFilter openFilter={openFilter} setOpenFilter={setOpenFilter} search={search} setSearch ={setSearch} brand={brand} setBrand = {setBrand}priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandeChange={handleBrandeChange}/>
        {

          data?.length > 0 ? (

            <>
            <div className='flex gap-5'>
              <FilterSection search={search} setSearch ={setSearch} brand={brand} setBrand = {setBrand}priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandeChange={handleBrandeChange}/>
              {
                filtereData?.length > 0 ?(
                  <div className='flex flex-col justify-center items-center'> 
                  <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 lg:gap-14 md:gap-10 gap-3 mt-5 ml-4  '>
                {
                  filtereData?.slice(page *9 - 9, page * 9).map((products, index)=>{
                    return <ProductCard key={index} products={products}/>
                  })
                }
              </div>
              <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage}/>
              </div>
                ):(
                  <div className='flex justify-center items-center lg:h-[600px] lg:w-[900px] md:h-[600px] md:w-[900px] mt-10'> 
                    <Lottie animationData={notfound} classID='w-[500px]'/>
                  </div>
                )
              }
            
              
            </div>
            

            </>


          ): (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm'/>

              </video>
              

            </div>
          )
        }
       </div>
    </div>
  );
};
export default Products