"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Phone number schema validation
const formSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
});

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${url}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token.");
  }

  const result = await response.json();
  return result.accessToken;
}

export default function ForgetPasswordPreview() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      let token = accessToken;

      if (!accessToken && refreshToken) {
        token = await refreshAccessToken(refreshToken);
        if (token) {
          Cookies.set("accessToken", token);
        }
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      console.log(values.phone);
      const response = await fetch(`${url}/auth/add-phone`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ phone: values.phone }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      const result = await response.json();
      alert("OTP sent successfully!");
      router.push("/signup/verify/otp");
      console.log("Response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verification</CardTitle>
          <CardDescription>
            Enter your phone number to receive an OTP for password recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-4">
                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="phone">Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          id="phone"
                          placeholder="01*******"
                          {...field}
                          defaultCountry="BD"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-3">
                  <Button
                    type="submit"
                    className="bg-green-500 text-white w-full"
                  >
                    Send OTP
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-gray-200 text-black w-full"
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    Skip
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
