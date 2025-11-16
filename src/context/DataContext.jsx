import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  //  Fetch all products from API
const fetchAllProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapiserver.reactbd.org/api/products");
 
    const productsData = res.data.data || [];
    
    setData(productsData);

    console.log("Fetched products:", productsData);
  } catch (error) {
    console.error("Fetch error:", error.message);
    setData([]); 
  }
};
  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property]);
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
