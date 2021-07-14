import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Providers from "next-auth/providers";
import prisma from "../../../config/prisma";

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      session.username = user.username;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
