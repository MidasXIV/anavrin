import { FC, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { encrypt, decrypt } from "../../lib/crypto";

// Define available AI providers
export enum AIProvider {
  GEMINI = "gemini",
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  CUSTOM = "custom"
}

// Provider-specific information
const providerInfo = {
  [AIProvider.GEMINI]: {
    name: "Google Gemini",
    description: "Google's advanced AI model for text and code generation",
    apiKeyPlaceholder: "Enter your Gemini API key",
    apiKeyDescription: "This key will be used to authenticate requests to the Gemini API",
    apiKeyUrl: "https://ai.google.dev/",
    apiKeyFieldName: "geminiAPIKey"
  },
  [AIProvider.OPENAI]: {
    name: "OpenAI",
    description: "Powerful language models like GPT-4 and GPT-3.5",
    apiKeyPlaceholder: "Enter your OpenAI API key",
    apiKeyDescription: "This key will be used to authenticate requests to the OpenAI API",
    apiKeyUrl: "https://platform.openai.com/api-keys",
    apiKeyFieldName: "openaiAPIKey"
  },
  [AIProvider.ANTHROPIC]: {
    name: "Anthropic",
    description: "Claude AI models for advanced reasoning and analysis",
    apiKeyPlaceholder: "Enter your Anthropic API key",
    apiKeyDescription: "This key will be used to authenticate requests to the Anthropic API",
    apiKeyUrl: "https://console.anthropic.com/account/keys",
    apiKeyFieldName: "anthropicAPIKey"
  },
  [AIProvider.CUSTOM]: {
    name: "Custom API",
    description: "Connect to any other AI service with an API key",
    apiKeyPlaceholder: "Enter your API key",
    apiKeyDescription: "This key will be used to authenticate requests to your custom AI service",
    apiKeyUrl: "",
    apiKeyFieldName: "customAPIKey"
  }
};

// Create a dynamic schema based on the selected provider
const createFormSchema = (provider: AIProvider) => {
  const schema: Record<string, z.ZodString> = {};

  // Add the API key field for the selected provider
  schema[providerInfo[provider].apiKeyFieldName] = z.string().min(1, "API Key is required");

  // For custom provider, add a name field
  if (provider === AIProvider.CUSTOM) {
    schema.customAPIName = z.string().min(1, "API Name is required");
  }

  return z.object(schema);
};

type FormValues = Record<string, string>;

const AIAPIKeysForm: FC<unknown> = () => {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AIProvider.GEMINI);
  const [formSchema, setFormSchema] = useState(createFormSchema(selectedProvider));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [providerInfo[selectedProvider].apiKeyFieldName]: "",
      ...(selectedProvider === AIProvider.CUSTOM ? { customAPIName: "" } : {})
    }
  });

  const handleProviderChange = (provider: AIProvider) => {
    setSelectedProvider(provider);
    const newSchema = createFormSchema(provider);
    setFormSchema(newSchema);

    // Reset form with new default values
    form.reset({
      [providerInfo[provider].apiKeyFieldName]: "",
      ...(provider === AIProvider.CUSTOM ? { customAPIName: "" } : {})
    });
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const apiKey = values[providerInfo[selectedProvider].apiKeyFieldName];
    const encryptedAPIKey = encrypt(apiKey);
    console.log(`Encrypted API Key: ${encryptedAPIKey}`);
    const decryptedAPIKey = decrypt(encryptedAPIKey);
    console.log(`Decrypted API Key: ${decryptedAPIKey}`);

    // Here you would save the encrypted API key to your database
    // You might want to store the provider type along with the key
  };

  const currentProvider = providerInfo[selectedProvider];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI API Configuration</CardTitle>
        <CardDescription>
          Configure your AI service API keys for enhanced chat functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Your API keys will be encrypted before storage. Never share your API keys with anyone.
          </AlertDescription>
        </Alert>

        <div className="mb-6">
          <Select
            value={selectedProvider}
            onValueChange={value => handleProviderChange(value as AIProvider)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AIProvider).map(provider => (
                <SelectItem key={provider} value={provider}>
                  {providerInfo[provider].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {selectedProvider === AIProvider.CUSTOM && (
              <FormField
                control={form.control}
                name="customAPIName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a name for this API" {...field} />
                    </FormControl>
                    <FormDescription>A friendly name to identify this API service</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name={currentProvider.apiKeyFieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{currentProvider.name} API Key</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={currentProvider.apiKeyPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {currentProvider.apiKeyDescription}
                    {currentProvider.apiKeyUrl && (
                      <>
                        {" "}
                        <a
                          href={currentProvider.apiKeyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Get your API key here
                        </a>
                      </>
                    )}
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

export default AIAPIKeysForm;
