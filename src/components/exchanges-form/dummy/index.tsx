import { useForm } from "@mantine/hooks";
import { InputWrapper, Input, Button } from "@mantine/core";
import { FC } from "react";
import { encrypt, decrypt } from "../../../lib/crypto";

const DummyForm: FC<unknown> = () => {
  const form = useForm({
    initialValues: {
      dummyAPI: "",
      dummySecret: ""
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });
  return (
    <form
      onSubmit={form.onSubmit(values => {
        console.log(values);
        const encryptedAPIKey = encrypt(values.dummyAPI);
        console.log(`Encrypted message: ${encryptedAPIKey}`);
        const decryptedAPIKey = decrypt(encryptedAPIKey);
        console.log(`Decrypted message: ${decryptedAPIKey}`);
      })}
    >
      <section className="py-8">
        <InputWrapper
          id="dummy-api-key"
          required
          label="Dummy API Key"
          description="Please enter your dummy API key"
          className="pb-2"
        >
          <Input
            id="dummy-api-key"
            placeholder="API key"
            variant="filled"
            value={form.values.dummyAPI}
            onChange={event => form.setFieldValue("dummyAPI", event.currentTarget.value)}
          />
        </InputWrapper>
        <InputWrapper
          id="dummy-api-secret"
          required
          label="Dummy API Secret"
          description="Please enter your dummy API Secret"
          className="pb-2"
        >
          <Input
            id="dummy-api-secret"
            placeholder="API secret"
            variant="filled"
            value={form.values.dummySecret}
            onChange={event => form.setFieldValue("dummySecret", event.currentTarget.value)}
          />
        </InputWrapper>

        <Button type="submit">Connect</Button>
      </section>
    </form>
  );
};

export default DummyForm;
