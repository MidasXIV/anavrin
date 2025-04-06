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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { encrypt, decrypt } from "../../lib/crypto";

const formSchema = z.object({
  geminiAPIKey: z.string().min(1, "API Key is required")
});

type FormValues = z.infer<typeof formSchema>;

const GeminiAPIForm: FC<unknown> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      geminiAPIKey: ""
    }
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const encryptedAPIKey = encrypt(values.geminiAPIKey);
    console.log(`Encrypted API Key: ${encryptedAPIKey}`);
    const decryptedAPIKey = decrypt(encryptedAPIKey);
    console.log(`Decrypted API Key: ${decryptedAPIKey}`);
    // Here you would save the encrypted API key to your database
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Google Gemini API Configuration</CardTitle>
        <CardDescription>
          Configure your Google Gemini API key for AI chat functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Your API key will be encrypted before storage. You can obtain a Gemini API key from the Google AI Studio.
          </AlertDescription>
        </Alert>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="geminiAPIKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gemini API Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your Gemini API key" {...field} />
                  </FormControl>
                  <FormDescription>
                    This key will be used to authenticate requests to the Gemini API
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save API Key</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GeminiAPIForm; 