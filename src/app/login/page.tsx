"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { LoginData, LoginResult } from "./type";

import { login } from "./actions";

const Login: React.FC = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandlerAndEmailValidator = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email || !emailRegex.test(credentials.email)) {
      // You can use toast or alert for feedback
      toast("Please enter a valid email address.");
      return;
    }
    const result: LoginResult = await login(credentials);
    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message || "Login failed.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          onSubmit={submitHandlerAndEmailValidator}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={credentials.email}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              name="password"
              value={credentials.password}
              onChange={inputHandler}
            />
          </div>
          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
