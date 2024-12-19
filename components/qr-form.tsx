"use client";
import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

// Zod schema for form validation
const qrSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().regex(/^\d+$/, { message: "Age must be a number" }),
  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{10,15}$/, { message: "Invalid phone number" }),
  permLocation: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" }),
  currentLocation: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" }),
});

type UserData = z.infer<typeof qrSchema>;

const QrForm: React.FC = () => {
  // State to control QR code visibility
  const [showQrCode, setShowQrCode] = useState(false);
  const [submittedData, setSubmittedData] = useState<UserData | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      name: "",
      age: "",
      phone: "",
      permLocation: "",
      currentLocation: "",
    },
  });

  // Optimized submit handler with proper error handling
  const onSubmit = useCallback(
    (data: UserData) => {
      try {
        console.log("Validated Form Data:", data);
        // Store submitted data and show QR code
        setSubmittedData(data);
        setShowQrCode(true);

        // Reset the form
        reset();
      } catch (error) {
        console.error("Submission Error:", error);
        // Implement proper error toast/notification
      }
    },
    [reset]
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Generate QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "age", label: "Age", type: "text" },
              { name: "phone", label: "Phone Number", type: "tel" },
              {
                name: "permLocation",
                label: "Permanent Location",
                type: "text",
              },
              {
                name: "currentLocation",
                label: "Current Location",
                type: "text",
              },
            ].map(({ name, label, type }) => (
              <div key={name} className="space-y-1">
                <Controller
                  name={name as keyof UserData}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type={type}
                        placeholder={`Enter Your ${label}`}
                        className={`${
                          errors[name as keyof UserData] ? "border-red-500" : ""
                        }`}
                      />
                      {errors[name as keyof UserData] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[name as keyof UserData]?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            ))}
            <Button type="submit" className="w-full">
              Generate QR Code
            </Button>
          </form>
        </CardContent>
      </Card>

      {showQrCode && submittedData && (
        <div className="mt-8 flex flex-col items-center space-y-4">
          <h2 className="text-lg font-medium text-center">
            Your Generated QR Code
          </h2>
          <QRCode value={JSON.stringify(submittedData)} />
        </div>
      )}
    </div>
  );
};

export default QrForm;
