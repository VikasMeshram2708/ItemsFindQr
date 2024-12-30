/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prismaInstance } from "@/db";
import { signUpSchema, updateProfileSchema } from "../model/user";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

// Sign Up
export const signup = async (prevState: any, formData: FormData) => {
  try {
    const rawdata: signUpSchema = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validate = signUpSchema.safeParse(rawdata);
    if (!validate.success) {
      const fieldErrors = validate.error.flatten().fieldErrors;
      return {
        fieldErrors: fieldErrors,
      };
    }
    // validate email
    const userExist = await prismaInstance.user.findUnique({
      where: {
        email: validate?.data?.email as string,
      },
      select: {
        email: true,
      },
    });

    if (userExist) {
      return {
        error: "User Already Exists",
      };
    }
    // hash the password
    const hashPassword = await bcrypt.hash(validate?.data?.password, 10);
    const newUser = {
      ...rawdata,
      password: hashPassword,
    };

    await prismaInstance.user.create({
      data: newUser,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: `Something went wrong. Sign Up Failed. ${error}`,
    };
  }
};

// Fetch User
export const getProfile = async (id: string) => {
  try {
    // get the user
    const user = await prismaInstance.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        currentAddress: true,
        permanentAddress: true,
        personalNo: true,
        guardiansNo: true,
        image: true,
      },
    });

    return {
      data: user,
    };
  } catch (error) {
    return {
      error: `Something went wrong. Sign Up Failed. ${error}`,
    };
  }
};

// Update Profile
export const updateProfile = async (prevState: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return redirect("/au/lo");
    }
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      currentAddress: formData.get("currentAddress"),
      permanentAddress: formData.get("permanentAddress"),
      personalNo: formData.get("personalNo"),
      guardiansNo: formData.get("guardiansNo"),
    };

    const validate = updateProfileSchema.safeParse(rawData);
    if (!validate?.success) {
      const fieldError = validate?.error.flatten().fieldErrors;
      return {
        fieldError: fieldError,
      };
    }

    await prismaInstance.user.update({
      data: validate?.data,
      where: {
        id: session?.user?.id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: `Something went wrong. Failed to updated profile. ${error}`,
    };
  }
};
