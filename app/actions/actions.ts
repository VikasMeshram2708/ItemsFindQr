/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginSchema } from "../model/user";

export const login = async (prevState: any, formData: FormData) => {
  const rawdata: loginSchema = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = loginSchema.safeParse(rawdata);
  if (!validate.success) {
    const fieldErrors = validate.error.flatten().fieldErrors;
    return {
      error: fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      email: validate.data.email,
      password: validate.data.password,
    },
  };
};
