/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { NextAuthOptions, User } from "next-auth";

// console.log("env", {
//   auth_secret: process.env.NEXTAUTH_SECRET,
//   auth_url: process.env.NEXTAUTH_URL,
//   gid: process.env.NEXTAUTH_GOOGLE_ID,
//   gs: process.env.NEXTAUTH_GOOGLE_SECRET,
// });

export const authOptions: NextAuthOptions = {
  pages: {
    newUser: "/au/sn",
    signIn: "/au/lo",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          placeholder: "Type Email",
        },
        password: {
          type: "password",
          placeholder: "Type Password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;
        const { email, password } = credentials;
        console.log("auth", { email, password });
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, String(email)),
          columns: {
            id: true,
            email: true,
            password: true,
          },
        });

        console.log("existingUser", existingUser);

        if (!existingUser) {
          throw new Error("User Doesn't Exist");
        }

        // Compare the Password
        const isValidPassword = await bcrypt.compare(
          String(password),
          String(existingUser.password)
        );

        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: existingUser.id,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
};
