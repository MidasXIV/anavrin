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
  binanceAPI: z.string().min(1, "API Key is required"),
  binanceSecret: z.string().min(1, "API Secret is required")
});

type FormValues = z.infer<typeof formSchema>;

const BinanceForm: FC<unknown> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      binanceAPI: "",
      binanceSecret: ""
    }
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const encryptedAPIKey = encrypt(values.binanceAPI);
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
            name="binanceAPI"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Binance API Key</FormLabel>
                <FormControl>
                  <Input placeholder="API key" {...field} />
                </FormControl>
                <FormDescription>Please enter your binance API key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="binanceSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Binance API Secret</FormLabel>
                <FormControl>
                  <Input placeholder="API secret" {...field} />
                </FormControl>
                <FormDescription>Please enter your binance API Secret</FormDescription>
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

export default BinanceForm;
