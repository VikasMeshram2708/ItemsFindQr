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
import { useSession } from "next-auth/react";
import React, { useCallback, useRef, useState } from "react";
import QRCode from "react-qr-code";

export default function QrPage() {
  const { data } = useSession();
  const [user, setUser] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQr = useCallback(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const qrString = `${BASE_URL}/user/${data?.user?.id}`;
    setUser(qrString);

    // Generate QR code and prepare for download
    setTimeout(() => {
      if (qrRef.current) {
        const svg = qrRef.current.querySelector("svg");
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svgBlob);
          setDownloadUrl(url);
        }
      }
    }, 100);
  }, [data]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
            sapiente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateQr} type="button">
            Generate QR
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-4">
          {user && (
            <div ref={qrRef}>
              <QRCode value={user} />
            </div>
          )}
          {downloadUrl && (
            <a href={downloadUrl} download="qrcode.svg" className="text-blue-600 underline">
              Download QR Code
            </a>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
