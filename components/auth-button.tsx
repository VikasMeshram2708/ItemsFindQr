import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function AuthButton() {
  return (
    <Button
      onClick={async () => {
        await signIn("google", {
          redirect: true,
          redirectTo: "/",
        });
      }}
      variant={"outline"}
      className="shadow-lg w-full"
      type="submit"
    >
      <Image src="/google.svg" alt="google oauth" width={25} height={25} />
      Sign In with Google
    </Button>
  );
}
