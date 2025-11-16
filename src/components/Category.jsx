import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'



const Category = () => {
    const { categoryOnlyData } = getData()
    // console.log(categoryOnlyData);
    const navigate = useNavigate()


    return (
        <div className=' bg-linear-to-r from-[#949494] via-[#363636] to-[#949494]'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-around py-7 px-4'>

                {
                    categoryOnlyData?.map((item, index) => {
                        return <div key={index}>
                            <button onClick={() => navigate(`category/${item}`)} className='uppercase  text-gray-900 flex gap-2 items-center justify-center 
                     bg-white/30 backdrop-blur-md border border-white/40 shadow-md 
                     transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:scale-[1.02] px-3 py-1 rounded-md cursor-pointer font-bold'>{item}</button>

                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default Category