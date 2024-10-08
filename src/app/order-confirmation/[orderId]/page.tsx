"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import Link from "next/link";
import { GiConfirmed } from "react-icons/gi";
import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/store";

const OrderConfirmation = ({ params }: { params: { orderId: string } }) => {
  const router = useRouter();
  const { orderId } = params;
  const { products, totalPrice, resetCart } = useCartStore();

  // useRef to track if the useEffect has run
  const hasFetchedData = useRef(false);

  useEffect(() => {
    // Prevent double fetching due to React.StrictMode in development
    if (hasFetchedData.current) {
      return;
    }

    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm/${orderId}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    // Reset the cart and make the request
    resetCart();
    makeRequest();

    // Mark that the effect has been executed
    hasFetchedData.current = true;
  }, [router, orderId, resetCart]);

  const handleContinueShopping = () => {
    // Redirect to the homepage or a shopping page
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Ordine confermato</h1>
        <p className="text-lg mb-4">Grazie per il tuo acquisto!</p>
        <div className="flex items-center justify-center">
          <GiConfirmed className="w-20 h-20" />
        </div>
        <p className="text-gray-600 mb-6">
          Il tuo ordine #{orderId} è stato effettuato con successo. Riceverai
          una email di conferma a breve.
        </p>
        <Button
          onClick={handleContinueShopping}
          className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Continua a fare acquisti
        </Button>
        <Button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          <Link href="/orders">Controlla lo stato del tuo ordine</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
