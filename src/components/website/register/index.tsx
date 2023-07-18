import { FC, useState } from "react";
import api from "../../../services/create-service";

const Register: FC<unknown> = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set loading state
    setIsLoading(true);

    try {
      const response = await api.postSubscribeUser({ email });

      if (response.status === 200) {
        // Email saved successfully
        setIsSubmitted(true);
      } else if (response.status === 409) {
        // User is already subscribed
        setError("You are already subscribed.");
      } else {
        // Other error occurred
        setError("An error occurred. Please try again later.");
      }
    } catch (err) {
      console.log(err);
      // console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    }

    // Reset form and loading state after a short delay
    setTimeout(() => {
      setEmail("");
      setIsLoading(false);
      setIsSubmitted(false);
      setError("");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8 font-mono">
      <div className="mx-auto w-full lg:w-1/2">
        <span className="mx-auto mb-3 flex w-max flex-row rounded-xl bg-gray-200 p-1 px-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <span className="ml-2 uppercase">Get Exclusive Access</span>
        </span>
        <div className="mb-4 px-8 text-center">
          <h3 className="mb-2 pt-4 text-5xl font-medium">Be the First to Know</h3>
          <p className="mb-4 text-sm font-bold text-gray-700">
            Join our community and stay updated with the latest news and announcements about
            Anavrin.
          </p>
        </div>
        <form
          action=""
          className="mx-auto mb-4 flex w-3/4 flex-col gap-3 px-8 pt-4 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            className="flex-1 rounded-lg border border-transparent bg-violet-200/50 px-5 py-3 placeholder:text-black/30 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="Enter your email Address..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading || isSubmitted} // Disable input when loading or submitted
          />

          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-3 font-bold text-white"
            disabled={isLoading || isSubmitted}
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
        {isSubmitted && (
          <div className="text-center font-bold text-green-500">
            Thank you for subscribing! Your email has been sent to the database.
          </div>
        )}
        {error && <p className="text-center font-bold text-red-500">{error}</p>}
        <div className="text-center text-sm text-gray-700">
          We&apos;ll never share this info. No spam, ever.
        </div>
      </div>
    </div>
  );
};

export default Register;
