import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_PROVIDER_FROM
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as { id: string; name: string; email: string };

      return session;
    },
  },
}