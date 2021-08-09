import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { InputWrapper, Input, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import DefaultLayout from "../layouts/default";

const Overview: FC = () => {
  const [session, loading] = useSession();
  const form = useForm({
    initialValues: {
      binanceAPI: "",
      binanceSecret: ""
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });
  const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
  return (
    <>
      <DefaultLayout title="User setting" sidebar="" description="Update user profile">
        {/* 
        1. Choose Exchange Account
        2. Transactions only / Balance only
        3. API Limitations
        4. Scan API key / API Secret
        5. Add connection
        */}
        <div className="w-full h-full flex flex-row">
          <div className="dashboard-primary-panel">
            <h1 className="text-2xl mb-2">Connect anavrin to an exchange account.</h1>
            <p className="text-md text-gray-600">We currently only support Binance exchange.</p>
            <form onSubmit={form.onSubmit(values => console.log(values))}>
              <section className="py-8">
                <InputWrapper
                  id="binance-api-key"
                  required
                  label="Binance API Key"
                  description="Please enter your binance API key"
                  className="pb-2"
                >
                  <Input
                    id="binance-api-key"
                    placeholder="API key"
                    variant="filled"
                    value={form.values.binanceAPI}
                    onChange={event => form.setFieldValue("binanceAPI", event.currentTarget.value)}
                  />
                </InputWrapper>
                <InputWrapper
                  id="binance-api-secret"
                  required
                  label="Binance API Secret"
                  description="Please enter your binance API Secret"
                  className="pb-2"
                >
                  <Input
                    id="binance-api-secret"
                    placeholder="API secret"
                    variant="filled"
                    value={form.values.binanceSecret}
                    onChange={event =>
                      form.setFieldValue("binanceSecret", event.currentTarget.value)
                    }
                  />
                </InputWrapper>

                <Button type="submit">Connect</Button>
              </section>
            </form>
          </div>
          <div className="dashboard-secondary-panel">Secondary Panel</div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Overview;
