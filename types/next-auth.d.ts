import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    image: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      image: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface Jwt extends DefaultJWT {
    id: string;
    email: string;
    image: string;
    exp?: number;
  }
}
