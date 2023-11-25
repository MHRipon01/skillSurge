import { loadStripe } from "@stripe/stripe-js"; 
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";



   const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway_PK);



const Payment = () => {
    const axiosPublic = useAxiosPublic()
    const {id} = useParams()
    const [singleClass , setSingleClass] = useState()

    useEffect(() => {
        const fetchSingleClass = async () => {
          try {
            const response = await axiosPublic.get(`/singleClass/${id}`);
            console.log(response.data);
            setSingleClass(response.data)
            // console.log(singleClass);
          } catch (error) {
            console.log( error); 
          }
        };
        fetchSingleClass()
      }, []);
    
    return (
        <div>
         {/* <Elements stripe={stripePromise}>
                    <CheckOutFrom singleClass={singleClass}></CheckOutFrom>
                </Elements> */}
                <Elements stripe={stripePromise}>
                    <CheckOutFrom  singleClass={singleClass}></CheckOutFrom>
                </Elements>
{
    singleClass?.Price
}
        </div>
    );
};

export default Payment;