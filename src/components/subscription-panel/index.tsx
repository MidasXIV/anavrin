import { redirect } from "next/dist/server/api-utils";
import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { FC, useEffect, useState } from "react";
import ManageSubscriptionButton from "./manage-subscription-button";
import api from "../../services/create-service";
import getFormattedSubscriptionPrice from "../../util/subscription-utils";

function Card({ title, description, footer, children }) {
  return (
    <div className="p m-auto my-8 w-full max-w-3xl rounded-md border border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-600">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md border-t border-zinc-700 bg-charcoal-400 p-4 text-zinc-300">
        {footer}
      </div>
    </div>
  );
}

function InputCard({ id, title, description, footer, value, onChange }) {
  return (
    <div className="p m-auto my-8 w-full max-w-3xl rounded-md border border-zinc-700">
      <div className="px-2 py-3">
        <TextInput
          id={id}
          required
          label={title}
          description={description}
          className="pb-2"
          placeholder=""
          variant="filled"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="rounded-b-md border-t border-zinc-700 bg-charcoal-400 p-4 text-zinc-300">
        {footer}
      </div>
    </div>
  );
}

const SubscriptionPAnel: FC<unknown> = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subscriptionData = await api.getSubscription();
        if (subscriptionData.data) {
          const { subscription: subscriptionDocument } = subscriptionData.data;
          setSubscription(subscriptionDocument);
        } else {
          console.error("Error in fetching subscription.");
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

  const userDetails = {
    full_name: "xiv"
  };

  const user = session?.user;

  const form = useForm({
    initialValues: {
      userName: "",
      userEmail: ""
    }
  });
  // if (!session) {
  //   return redirect("/signin");
  // }

  const updateName = async (formData: FormData) => {
    console.log(formData);
    // const newName = formData.get("name") as string;
    // const supabase = createServerActionClient<Database>({ cookies });
    // const session = await getSession();
    // const user = session?.user;
    // const { error } = await supabase
    //   .from("users")
    //   .update({ full_name: newName })
    //   .eq("id", user?.id);
    // if (error) {
    //   console.log(error);
    // }
    // revalidatePath("/account");
  };

  const updateEmail = async (formData: FormData) => {
    console.log(formData);

    // const newEmail = formData.get("email") as string;
    // const supabase = createServerActionClient<Database>({ cookies });
    // const { error } = await supabase.auth.updateUser({ email: newEmail });
    // if (error) {
    //   console.log(error);
    // }
    // revalidatePath("/account");
  };

  if (loading) {
    return <p>Loading</p>;
  }
  console.log("subscription-panel render");
  return (
    <section className="py-8">
      <div className="mx-auto">
        <div className="sm:align-center flex flex-col">
          <h1 className="text-center text-4xl font-extrabold">Account</h1>
          <p className="m-auto mt-5 max-w-2xl text-center text-2xl text-zinc-600">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-2">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : "You are not currently subscribed to any plan."
          }
          footer={<ManageSubscriptionButton subscription={subscription} />}
        >
          <div className="mb-4 mt-8 text-xl font-semibold">
            {subscription ? (
              `${getFormattedSubscriptionPrice(subscription)}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>

        {/* <InputCard
          id="user-name-input"
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">64 characters maximum</p>
              <Button variant="slim" type="submit" form="nameForm" disabled>
                Update Name
              </Button>
            </div>
          }
          value={form.values.userName}
          onChange={event => form.setFieldValue("userName", event.currentTarget.value)}
        /> */}

        {/* <InputCard
          id="user-email-input"
          title="Your Email"
          description="Please enter the email address you want to use to login."
          value={form.values.userEmail}
          onChange={event => form.setFieldValue("userEmail", event.currentTarget.value)}
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">We will email you to verify the change.</p>
              <Button variant="slim" type="submit" form="emailForm" disabled>
                Update Email
              </Button>
            </div>
          }
        /> */}
      </div>
    </section>
  );
};

export default SubscriptionPAnel;
