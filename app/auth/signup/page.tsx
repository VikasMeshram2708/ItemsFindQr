"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import googleImg from "@/public/google.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function SignUp() {
  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/auth/login",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <div className="min-h-screen w-full container mx-auto grid lg:grid-cols-2 sm:gap-2 lg:gap-8 items-center px-4 py-8">
      {/* Company Section */}
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
          ItemsFind QR Code Generator <br /> | Personalized QR Codes from Your
          Data
        </h1>
        <p className="text-sm md:text-base lg:text-lg mt-4">
          Create custom QR codes instantly with ItemsFind. Transform your
          personal, business, or product information into shareable, scannable
          QR codes with ease and precision.
        </p>
      </div>

      {/* Sign-Up Form */}
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl lg:text-2xl font-bold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            <span>Sign up and find the best deals on ItemsFind</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input
              type="text"
              placeholder="Type Name"
              className="h-12 px-4 text-base"
            />
            <Input
              type="email"
              placeholder="Type Email"
              className="h-12 px-4 text-base"
            />
            <Input
              type="password"
              placeholder="Type Password"
              className="h-12 px-4 text-base"
            />
            <div className="grid gap-3 mt-4">
              <Button
                type="button"
                className="w-full py-3 font-semibold text-base"
              >
                Sign Up
              </Button>
              <Button
                onClick={handleGoogleSignUp}
                variant={"outline"}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-base"
              >
                <Image
                  src={googleImg}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  alt="Google Icon"
                />
                <span>Sign Up with Google</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
