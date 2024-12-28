"use client";

import AuthButton from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" action="">
            <Label htmlFor="email">
              <Input placeholder="Type Email" />
            </Label>
            <Label htmlFor="email">
              <Input placeholder="Type Password" />
            </Label>
            <Button type="submit">Login</Button>
            <AuthButton />
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p>
            Not an user ? <Link href="/au/sn">Sign Up</Link>
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              toast({
                title: "Error",
                description: "Coming Soon",
              });
            }}
          >
            Forget Password ?
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
