// import { Session, User } from "@supabase/supabase-js";
import { Button } from "@mantine/core";
import cn from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../services/create-service";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// // import Button from "@/components/ui/Button";
// // import { Database } from "@/types_db";
// // import { postData } from "@/utils/helpers";
// // import { getStripe } from "@/utils/stripe-client";

// // type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
// // type Product = Database["public"]["Tables"]["products"]["Row"];
// // type Price = Database["public"]["Tables"]["prices"]["Row"];
// interface ProductWithPrices extends Product {
//   prices: Price[];
// }
// interface PriceWithProduct extends Price {
//   products: Product | null;
// }
// interface SubscriptionWithProduct extends Subscription {
//   prices: PriceWithProduct | null;
// }

// interface Props {
//   session: Session | null;
//   user: User | null | undefined;
//   products: ProductWithPrices[];
//   subscription: SubscriptionWithProduct | null;
// }

type BillingInterval = "lifetime" | "year" | "month";

// export default function Pricing({ session, user, subscription }) {
export default function Pricing({ session, user, subscription }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { data: Session, status } = useSession();
  const intervals = Array.from(
    new Set(products.flatMap(product => product?.prices?.map(price => price?.interval)))
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productInfo = await api.getActiveProductsWithPrices();
        console.log(productInfo);
        if (productInfo.data) {
          setProducts(productInfo.data);
        } else {
          console.error("No data in the response.");
          // Handle this situation, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error("API request failed:", error);
        // Handle the error, e.g., display an error message to the user.
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckout = async price => {
    setPriceIdLoading(price.id);
    // if (!user) {
    //   return router.push("/signin");
    // }
    // if (subscription) {
    //   return router.push("/account");
    // }
    // try {
    //   const { sessionId } = await postData({
    //     url: "/api/create-checkout-session",
    //     data: { price }
    //   });

    //   const stripe = await getStripe();
    //   stripe?.redirectToCheckout({ sessionId });
    // } catch (error) {
    //   return alert((error as Error)?.message);
    // } finally {
    //   setPriceIdLoading(undefined);
    // }
  };

  if (loading) {
    return <p>Loading</p>;
  }
  if (!products.length)
    return (
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col" />
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        {/* <LogoCloud /> */}
      </section>
    );

  if (products.length === 1)
    return (
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account plans unlock
              additional features.
            </p>
            <div className="relative mt-12 flex self-center rounded-lg border border-zinc-800 bg-zinc-900">
              <div className="divide-y divide-zinc-600 rounded-lg border border-pink-500 border-opacity-50 bg-zinc-900 shadow-sm">
                <div className="m-1 whitespace-nowrap rounded-md border-zinc-800 p-6 py-2 text-2xl font-medium text-white shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
              {products[0].prices?.map(price => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="divide-y divide-zinc-600 rounded-lg bg-zinc-900 shadow-sm"
                  >
                    <div className="p-6">
                      <p>
                        <span className="white text-5xl font-extrabold">{priceString}</span>
                        <span className="text-base font-medium text-zinc-100">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-zinc-300">{price.description}</p>
                      <Button
                        variant="slim"
                        type="button"
                        disabled={false}
                        loading={priceIdLoading === price.id}
                        onClick={() => handleCheckout(price)}
                        className="mt-12 block w-full rounded-md py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900 "
                      >
                        {products[0].name === subscription?.prices?.products?.name
                          ? "Manage"
                          : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <LogoCloud /> */}
        </div>
      </section>
    );

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account plans unlock
            additional features.
          </p>
          <div className="relative mt-6 flex self-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 sm:mt-8">
            {intervals.includes("month") && (
              <button
                onClick={() => setBillingInterval("month")}
                type="button"
                className={`${
                  billingInterval === "month"
                    ? "relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm"
                    : "relative ml-0.5 w-1/2 border border-transparent text-zinc-400"
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes("year") && (
              <button
                onClick={() => setBillingInterval("year")}
                type="button"
                className={`${
                  billingInterval === "year"
                    ? "relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm"
                    : "relative ml-0.5 w-1/2 border border-transparent text-zinc-400"
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {products.map(product => {
            const price = product?.prices?.find(price => price.interval === billingInterval);
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn("divide-y divide-zinc-600 rounded-lg bg-zinc-900 shadow-sm", {
                  "border border-pink-500": subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === "Freelancer"
                })}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">{product.name}</h2>
                  <p className="mt-4 text-zinc-300">{product.description}</p>
                  <p className="mt-8">
                    <span className="white text-5xl font-extrabold">{priceString}</span>
                    <span className="text-base font-medium text-zinc-100">/{billingInterval}</span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="mt-8 block w-full rounded-md py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900"
                  >
                    {subscription ? "Manage" : "Subscribe"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {/* <LogoCloud /> */}
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
        Brought to you by
      </p>
      <div className="my-12 flex flex-col items-center space-y-4 sm:mt-8 sm:grid sm:grid-cols-5 sm:gap-6 sm:space-y-0 md:mx-auto md:max-w-2xl">
        <div className="flex items-center justify-start">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <img src="/nextjs.svg" alt="Next.js Logo" className="h-12 text-white" />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img src="/vercel.svg" alt="Vercel.com Logo" className="h-6 text-white" />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <img src="/stripe.svg" alt="stripe.com Logo" className="h-12 text-white" />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <img src="/supabase.svg" alt="supabase.io Logo" className="h-10 text-white" />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://github.com" aria-label="github.com Link">
            <img src="/github.svg" alt="github.com Logo" className="h-8 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
