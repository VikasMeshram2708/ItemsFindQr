import "next-auth";
import { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
