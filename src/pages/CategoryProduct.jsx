import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading3.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
    const [searchData, setSearchData] = useState([])
    const params = useParams()
    const category = params.category
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    const getFilterData = async () => {
        try {
            const res = await axios.get(`https://fakestoreapiserver.reactbd.org/api/products/${category}`)
            const data = res.data.products
            setSearchData(data)

        } catch (error) {
            console.log(error);

        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    }

    useEffect(() => {
        getFilterData()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='lg:ml-60 sm:ml-10 md:15'>
            <button
                onClick={() => navigate("/")}
                className="bg-gray-600 hover:bg-gray-700 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center "
            >
                <ChevronLeft /> Back
            </button>
            <h1 className="text-2xl font-semibold capitalize mb-6">
                Category: {category}
            </h1>

            {

                loading ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <video muted autoPlay loop className="h-32 w-32">
                            <source src={Loading} type="video/webm" />
                        </video>
                    </div>
                ) : searchData.length > 0 ? (
                    <div className='max-w-[1440px] mx-auto mt-10 mb-10 px-4'>
                        <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
                        {
                            searchData.map((products, index) => {
                                return <ProductListView key={index} product={products} />
                            })
                        }
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-[400px]'>
                        <p className="text-center text-gray-500 text-lg py-20">
                            Product not found.
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default CategoryProduct
