"use client";

import { signup } from "@/app/actions/actions";
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
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signup, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: "User Registered",
      });
      router.push("/au/lo");
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state?.error,
        variant: "destructive",
      });
    }
  }, [state, router]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {isPending ? "Processing..." : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" action={formAction}>
            <Label htmlFor="name">
              <Input name="name" type="text" placeholder="Type Name" />
              {state?.fieldErrors?.name && (
                <span className="text-sm text-red-500">
                  {state?.fieldErrors?.name}
                </span>
              )}
            </Label>
            <Label htmlFor="email">
              <Input name="email" type="email" placeholder="Type Email" />
              {state?.fieldErrors?.email && (
                <span className="text-sm text-red-500">
                  {state?.fieldErrors?.email}
                </span>
              )}
            </Label>
            <Label htmlFor="email">
              <Input
                name="password"
                type="password"
                placeholder="Type Password"
              />
              {state?.fieldErrors?.password && (
                <span className="text-sm text-red-500">
                  {state?.fieldErrors?.password}
                </span>
              )}
            </Label>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Processing..." : "Sign Up"}
            </Button>
            <AuthButton />
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Already an user ? <Link href="/au/lo">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
