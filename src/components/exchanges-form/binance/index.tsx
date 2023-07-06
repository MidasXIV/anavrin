import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { FC } from "react";
import { encrypt, decrypt } from "../../../lib/crypto";

const BinanceForm: FC<unknown> = () => {
  const form = useForm({
    initialValues: {
      binanceAPI: "",
      binanceSecret: ""
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });
  return (
    <form
      onSubmit={form.onSubmit(values => {
        console.log(values);
        const encryptedAPIKey = encrypt(values.binanceAPI);
        console.log(`Encrypted message: ${encryptedAPIKey}`);
        const decryptedAPIKey = decrypt(encryptedAPIKey);
        console.log(`Decrypted message: ${decryptedAPIKey}`);
      })}
    >
      <section className="py-8">
        <TextInput
          id="binance-api-key"
          required
          label="Binance API Key"
          description="Please enter your binance API key"
          className="pb-2"
          placeholder="API key"
          variant="filled"
          value={form.values.binanceAPI}
          onChange={event => form.setFieldValue("binanceAPI", event.currentTarget.value)}
        />
        <TextInput
          id="binance-api-secret"
          required
          label="Binance API Secret"
          description="Please enter your binance API Secret"
          className="pb-2"
          placeholder="API secret"
          variant="filled"
          value={form.values.binanceSecret}
          onChange={event => form.setFieldValue("binanceSecret", event.currentTarget.value)}
        />
        <Button type="submit">Connect</Button>
      </section>
    </form>
  );
};

export default BinanceForm;
