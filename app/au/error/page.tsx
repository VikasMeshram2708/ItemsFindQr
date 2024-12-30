"use client"; // Error boundaries must be Client Components

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const queryParam = useSearchParams();
  const param = queryParam.get("error");
  useEffect(() => {
  }, [param]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="max-w-lg mx-auto w-full shadow-lg">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{param}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
