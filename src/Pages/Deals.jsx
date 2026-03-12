import React, { useEffect, useState } from 'react'
import { GetDeals } from '../apis/product';

const Deals = () => {
    let [deals , setdeals]=useState()
     useEffect(() => {
        const FetchData = async () => {
          try {
            // setloader(true);
            // setError(null);
            const data = await GetDeals();
            setdeals(data);
          } catch (error) {
            console.log("Error loading companies", error);
            // setError("Failed to load companies");
          } finally {
            // setloader(false);
          }
        };
        FetchData();
      }, []);
      console.log(deals);
      
  return (
    <div><h1></h1></div>
  )
}

export default Deals