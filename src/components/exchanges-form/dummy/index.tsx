import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { encrypt, decrypt } from "../../../lib/crypto";

const formSchema = z.object({
  dummyAPI: z.string().min(1, "API Key is required"),
  dummySecret: z.string().min(1, "API Secret is required")
});

type FormValues = z.infer<typeof formSchema>;

const DummyForm: FC<unknown> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dummyAPI: "",
      dummySecret: ""
    }
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const encryptedAPIKey = encrypt(values.dummyAPI);
    console.log(`Encrypted message: ${encryptedAPIKey}`);
    const decryptedAPIKey = decrypt(encryptedAPIKey);
    console.log(`Decrypted message: ${decryptedAPIKey}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="py-8">
          <FormField
            control={form.control}
            name="dummyAPI"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dummy API Key</FormLabel>
                <FormControl>
                  <Input placeholder="API key" {...field} />
                </FormControl>
                <FormDescription>Please enter your dummy API key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dummySecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dummy API Secret</FormLabel>
                <FormControl>
                  <Input placeholder="API secret" {...field} />
                </FormControl>
                <FormDescription>Please enter your dummy API Secret</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Connect</Button>
        </section>
      </form>
    </Form>
  );
};

export default DummyForm;
