import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should have 2 characters" })
    .max(150, { message: "Name should not exceed more than 150 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(2, { message: "Password should have 2 characters" })
    .max(150, {
      message: "Password should not exceed more than 150 characters",
    }),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should have 2 characters" })
    .max(150, { message: "Name should not exceed more than 150 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  currentAddress: z
    .string()
    .min(10, { message: "Current Address should have 10 characters" })
    .max(250, {
      message: "Current Address should not exceed more than 250 characters",
    }),
  permanentAddress: z
    .string()
    .min(10, { message: "Permanent Address should have 10 characters" })
    .max(250, {
      message: "Permanent Address should not exceed more than 250 characters",
    }),
  personalNo: z
    .string()
    .min(10, { message: "Personal Phone Number should have 10 Digits" })
    .max(150, {
      message: "Personal Phone Number should not exceed more than 150 Digits",
    }),
  guardiansNo: z
    .string()
    .min(10, { message: "Guardians Phone Number should have 10 Digits" })
    .max(150, {
      message: "Guardians Phone Number should not exceed more than 150 Digits",
    }),
});

export type updateProfileSchema = z.infer<typeof updateProfileSchema>;
