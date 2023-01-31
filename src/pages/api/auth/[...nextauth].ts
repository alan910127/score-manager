import { type NextAuthOptions } from "next-auth";

import { prisma } from "@/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@/env/server.mjs";
import { MockProvider, withMockProvider } from "@/mock/auth";
import { mockUsers } from "@/mock/mockUsers";
import NYCUProvider from "@/providers/nycu";

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      // Include user.id on session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter,
  providers: [
    NYCUProvider({
      clientId: env.NYCUAUTH_CLIENT_ID,
      clientSecret: env.NYCUAUTH_CLIENT_SECRET,
    }),
  ],
};

export default withMockProvider(authOptions, {
  adapter,
  provider: MockProvider({
    id: "mock-nycu",
    name: "Mock NYCU",
    identifier: "role",
    mockUsers,
  }),
  enabled: env.NEXT_PUBLIC_MOCK_NEXTAUTH,
});
