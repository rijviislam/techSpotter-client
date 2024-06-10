import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUser();
  const { user } = useAuth();
  const navigate = useNavigate();
  const subscriptionPrice = 15;
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: subscriptionPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure]);
  const status = "verified";
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (user) {
        const result = await axiosSecure.patch(`/user-status/${user.email}`, {
          status,
        });
        console.log(result.data);
        return result.data;
      }
    },
  });
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
      console.log("Payment Error!", error);
      setError(error.message);
    } else {
      console.log("Payment Method 0111", paymentMethod);
      setError("");
    }
    // COMFIRM PAYMENT //
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // TO DO  CHANGE THE USER STATUS IS VERIFY
        console.log("Transaction Done!");
        Swal.fire({
          title: "Payment Successfully Done!",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        });

        try {
          await mutateAsync();
          navigate("/dashboard/my-profile");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">Payment</h2>
      <form
        className="lg:w-[500px] rounded-lg w-[350px] mt-5 p-5 mx-5 bg-yellow-50 shadow-md"
        onSubmit={handleSubmit}
      >
        <CardElement
          className="p-3 rounded-lg h-[60px] bg-gray-300"
          options={{
            style: {
              base: {
                fontSize: "20px",
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
          className="btn btn-sm btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>

        <p>{error}</p>
      </form>
    </div>
  );
}
