"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorParams = searchParams.get("error");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Card className="max-w-2xl shadow-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>
              <ShieldAlert color="red" />
            </span>
            <span>{errorParams}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Button>
            <Link href="https://mail.google.com" target="_blank">
              Click Here
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
