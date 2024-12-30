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
import { Label } from "@/components/ui/label";
import { errors } from "@/lib/data";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "../actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function User() {
  const [state, formAction, pending] = useActionState(updateProfile, null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: "Profiled Updated Successfully",
      });
    }
  }, [state]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {pending ? "Processing..." : "Update Your Details"}
          </CardTitle>
          <CardDescription>
            <ul className="grid p-4 shadow-lg">
              <h1 className="text-xl font-bold text-red-500 p-2">Important</h1>
              {errors?.map((err) => (
                <li
                  className="list-disc list-inside items-center"
                  key={err?.field}
                >
                  {err?.message}
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" action={formAction}>
            <Label htmlFor="name">
              <Input
                disabled={pending}
                name="name"
                type="text"
                placeholder="Type Your Name"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.name}
                </span>
              )}
            </Label>
            <Label htmlFor="email">
              <Input
                disabled={pending}
                name="email"
                type="email"
                placeholder="Type Your Email"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.email}
                </span>
              )}
            </Label>
            <Label htmlFor="currentAddress">
              <Input
                disabled={pending}
                name="currentAddress"
                type="text"
                placeholder="Type Your Current Address"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.currentAddress}
                </span>
              )}
            </Label>
            <Label htmlFor="permanentAddress">
              <Input
                disabled={pending}
                name="permanentAddress"
                type="text"
                placeholder="Type Your Permanent Address"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.permanentAddress}
                </span>
              )}
            </Label>
            <Label htmlFor="personalNo">
              <Input
                disabled={pending}
                name="personalNo"
                type="text"
                placeholder="Type Your Personal Phone Number"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.personalNo}
                </span>
              )}
            </Label>

            <Label htmlFor="guardiansNo">
              <Textarea
                disabled={pending}
                rows={4}
                name="guardiansNo"
                placeholder="Type Your Guardians Phone Number"
              />
              {state?.fieldError && (
                <span className="text-sm text-red-500">
                  {state?.fieldError?.guardiansNo}
                </span>
              )}
            </Label>
            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="max-w-sm mx-auto">
          <p className="text-sm text-red-500 text-wrap">{state?.error}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full h-auto" type="submit">
      {pending ? "Processing..." : "Submit"}
    </Button>
  );
}
