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
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" action="">
            <Label htmlFor="name">
              <Input placeholder="Type Name" />
            </Label>
            <Label htmlFor="email">
              <Input placeholder="Type Email" />
            </Label>
            <Label htmlFor="email">
              <Input placeholder="Type Password" />
            </Label>
            <Button type="submit">Sign Up</Button>
            <Button variant={"outline"} className="shadow-lg" type="submit">
              <Image
                src="/google.svg"
                alt="google oauth"
                width={25}
                height={25}
              />
              Sign In with Google
            </Button>
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
