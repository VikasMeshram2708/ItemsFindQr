import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should have 2 characters" })
    .max(150, { message: "Name should not exceed more than 150 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password should have 2 characters" })
    .max(150, {
      message: "Password should not exceed more than 150 characters",
    }),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password should have 5 characters" })
    .max(150, {
      message: "Password should not exceed more than 150 characters",
    }),
});

export type loginSchema = z.infer<typeof loginSchema>;
