import type { DefaultSession, Session } from "next-auth";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}
