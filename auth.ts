import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

console.log('env', process.env.AUTH_GOOGLE_SECRET, process.env.AUTH_GOOGLE_ID)
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
