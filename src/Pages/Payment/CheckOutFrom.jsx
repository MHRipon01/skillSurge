// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";



import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutFrom = ({singleClass}) => {
    console.log(singleClass);

  
    

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  console.log(stripe);
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
//   const [cart, refetch] = useCart();
  const navigate = useNavigate()
//   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
// console.log(singleClass?._id);
  useEffect(() => {
    if (singleClass?.Price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: singleClass?.Price })

        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, singleClass?.Price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error" , confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //now save the payment
        const payment = {
          email: user?.email,
          price: singleClass?.Price,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          classId: singleClass?._id,
          className: singleClass?.Title ,
          teacher:singleClass?.Teacher,
          img:singleClass?.Image,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
    
        
        if (res?.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Payment Successful`,
            showConfirmButton: false,
            timer: 500,
          });
          navigate('/dashboard/myEnrollClasses')
        }
      }
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary m-5"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-500">Your transaction id: {transactionId} </p>
      )}
    </form>
  );
};

export default CheckOutFrom;
