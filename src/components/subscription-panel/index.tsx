import { redirect } from "next/dist/server/api-utils";
import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import ManageSubscriptionButton from "./manage-subscription-button";

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

  // const [session, userDetails, subscription] = await Promise.all([
  //   getSession(),
  //   getUserDetails(),
  //   getSubscription()
  // ]);

  const userDetails = {
    full_name: "xiv"
  };

  const subscription = {
    id: "sub_1O71JGKMqmNpvz01L8kgNQo6",

    metadata: {},
    status: "active",
    price_id: "price_1O3mjXKMqmNpvz01VLCxhva2",
    quantity: 1,
    cancel_at_period_end: false,
    cancel_at: null,
    canceled_at: null,
    current_period_start: "2023-10-30T20:09:38.000Z",
    current_period_end: "2023-11-30T20:09:38.000Z",
    created: "2023-10-30T20:09:38.000Z",
    ended_at: null,
    trial_start: null,
    trial_end: null,
    prices: {
      _id: "653442b368d0d23847ec9a0e",
      id: "price_1O3mjXKMqmNpvz01VLCxhva2",
      active: true,
      currency: "usd",
      description: null,
      interval: "month",
      interval_count: 1,
      metadata: {},
      product_id: "prod_OrVlOCvoj6ooTp",
      trial_period_days: null,
      type: "recurring",
      unit_amount: 2000,
      products: {
        name: "Hobby"
      }
    }
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

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

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
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mb-4 mt-8 text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>

        {/* <form
          onSubmit={form.onSubmit(values => {
            console.log(values);
          })}
        >
          <TextInput
            id="user-name"
            required
            label="Your Name"
            description="Please enter your full name, or a display name you are comfortable with."
            className="pb-2"
            placeholder=""
            variant="filled"
            value={form.values.userName}
            onChange={event => form.setFieldValue("userName", event.currentTarget.value)}
          />
          <TextInput
            id="dummy-api-secret"
            required
            label="Your Email"
            description="Please enter the email address you want to use to login."
            className="pb-2"
            placeholder=""
            variant="filled"
            value={form.values.userEmail}
            onChange={event => form.setFieldValue("userEmail", event.currentTarget.value)}
          />
        </form> */}

        {/* <Card
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
        >
          <div className="mb-4 mt-8 text-xl font-semibold">
            <form
              id="nameForm"
              // action={updateName}
            >
              <input
                type="text"
                name="name"
                className="w-1/2 rounded-md bg-zinc-800 p-3"
                defaultValue={userDetails?.full_name ?? ""}
                placeholder="Your name"
                maxLength={64}
              />
            </form>
          </div>
        </Card> */}

        {/* <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">We will email you to verify the change.</p>
              <Button variant="slim" type="submit" form="emailForm" disabled>
                Update Email
              </Button>
            </div>
          }
        >
          <div className="mb-4 mt-8 text-xl font-semibold">
            <form
              id="emailForm"
              // action={updateEmail}
            >
              <input
                type="text"
                name="email"
                className="w-1/2 rounded-md bg-zinc-800 p-3"
                defaultValue={user ? user.email : ""}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card> */}

        <InputCard
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
        />

        <InputCard
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
        />
      </div>
    </section>
  );
};

export default SubscriptionPAnel;
