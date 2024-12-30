"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen py-20">
      <div className="container mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              facere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <Link
                href="/user"
                className={buttonVariants({ variant: "default" })}
              >
                Get Your QR Now
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
