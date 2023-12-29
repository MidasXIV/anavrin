import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="container mx-auto p-8">
      <div className="mx-auto w-full lg:w-2/3">
        <div className="mb-4 px-8 text-center">
          <h3 className="mb-2 pt-4 text-5xl font-thin text-gray-500">
            Stay connected and informed about the latest from Anavrin.
          </h3>
          <p className="text-md mb-4 text-gray-400">Join our mailing list.</p>
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

          <Button
            type="submit"
            className="h-full rounded-full px-5 py-3 font-light text-gray-400"
            disabled={isLoading || isSubmitted}
            variant="outline"
          >
            {isLoading ? "Sending..." : "Sign up for updates"}
          </Button>
        </form>
        {isSubmitted && (
          <div className="text-center font-bold text-green-500">
            Thank you for subscribing! Your email has been sent to the database.
          </div>
        )}
        {error && <p className="text-center font-bold text-red-500">{error}</p>}
        <div className="text-center text-sm text-gray-400">
          We&apos;ll never share this info. No spam, ever.
        </div>
      </div>
    </div>
  );
};

export default Register;
