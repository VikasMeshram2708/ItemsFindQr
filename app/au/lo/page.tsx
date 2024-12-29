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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
// import { useActionState, useEffect } from "react";
// import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // const [state, formAction, isPending] = useActionState(login, null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      email: user?.email,
      password: user?.password,
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {/* {isPending ? "Processing..." : "Login Page"} */}
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <Label htmlFor="email">
              <Input
                // disabled={isPending}
                name="email"
                placeholder="Type Email"
                value={user?.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
              {/* {state?.error?.email && (
                <span className="text-sm text-red-500 font-bold">
                  {state.error.email}
                </span>
              )} */}
            </Label>
            <Label htmlFor="email">
              <Input
                // disabled={isPending}
                name="password"
                type="password"
                placeholder="Type Password"
                value={user?.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
              />
              {/* {state?.error?.password && (
                <span className="text-sm text-red-500 font-bold">
                  {state.error.password}
                </span>
              )} */}
            </Label>
            {/* <SubmitBtn /> */}
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

// function SubmitBtn() {
//   const { pending } = useFormStatus();
//   return (
//     <Button disabled={pending} type="submit">
//       {pending ? "processing..." : "Login"}
//     </Button>
//   );
// }
