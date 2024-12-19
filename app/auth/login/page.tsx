"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import googleImg from "@/public/google.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const res = await signIn("google");
      if (res?.ok && res.status === 200) {
        redirect("/");
      }
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

      {/* Login Form */}
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl lg:text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Login and explore the best deals on ItemsFind
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input
              type="email"
              placeholder="Type Email"
              aria-label="Email"
              className="h-12 px-4 text-base"
            />
            <Input
              type="password"
              placeholder="Type Password"
              aria-label="Password"
              className="h-12 px-4 text-base"
            />
            <div className="grid gap-3 mt-4">
              <Button
                type="submit"
                className="w-full py-3 font-semibold text-base"
              >
                Login
              </Button>
              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-base"
              >
                <Image
                  src={googleImg}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  alt="Google Icon"
                />
                <span>Sign In With Google</span>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Not a User? <Link href="/auth/signup">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
