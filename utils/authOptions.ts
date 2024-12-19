import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET_KEY ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, user, profile }) {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user?.email))
        .limit(1);

      console.log("exs", JSON.stringify(existingUser.length));

      if (existingUser.length === 0) {
        // Allow Him to Sign In
        await db.insert(users).values({
          name: user.name as string,
          email: user.email,
          image: user.image,
        });
        return true;
      }

      // check if the provider type is google
      const isOAuthUser = account?.provider === "google";
      if (isOAuthUser) {
        const hasVerifiedEmail = await db.query.users.findFirst({
          where: eq(users.email, user.email),
        });

        if (hasVerifiedEmail?.emailVerified === false) {
          throw new Error("Verify Your Email First.");
        }
        console.log("vfe", hasVerifiedEmail?.emailVerified);
      }

      // if (existingUser.length) {
      //   const isVerifiedUser = await db.query.users.findFirst({
      //     where: eq(users.emailVerified, true),
      //   });
      //   console.log("isver", isVerifiedUser);
      //   if (existingUser && !isVerifiedUser?.emailVerified) {
      //     throw new Error("Verify Your Email First.");
      //   }
      // }

      console.log({ account, user, profile });
      return true;
    },
    // async signIn({ user }) {
    //   const { email } = user;

    //   if (email) {
    //     const existingUser = await db
    //       .select()
    //       .from(users)
    //       .where(eq(users.email, email))
    //       .limit(1);

    //     // Handle signup case
    //     if (!existingUser.length) {
    //       // If user doesn't exist, redirect to signup
    //       return `/auth/signup?email=${encodeURIComponent(email)}`;
    //     }
    //   }

    //   return true;
    // },
    async jwt({ user, token }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          email: user.email,
          picture: user.image,
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        };
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          ...session.user,
          id: String(token.id ?? ""),
          email: String(token.email ?? ""),
          image: String(token.picture ?? ""),
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};
