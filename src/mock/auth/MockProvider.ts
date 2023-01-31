import { prisma } from "@/server/db";
import type { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const createUserIfAbsent = async (user: User) => {
  await prisma.user.upsert({
    create: user,
    update: {},
    where: {
      id: user.id,
    },
  });
};

const createAccountIfAbsent = async (user: User) => {
  await prisma.account.upsert({
    create: {
      id: user.id,
      userId: user.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: user.id,
    },
    update: {},
    where: {
      id: user.id,
    },
  });
};

type MockProviderConfig = {
  id?: string;
  name?: string;
  identifier: string;
  mockUsers: Record<string, User>;
};

export const MockProvider = ({
  id,
  name,
  identifier,
  mockUsers,
}: MockProviderConfig) => {
  return Credentials({
    id,
    name,
    credentials: {
      [identifier]: {
        type: "text",
        label: identifier.toUpperCase(),
      },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const mockUser = mockUsers[credentials[identifier] as string];
      if (!mockUser) return null;

      await Promise.all([
        createUserIfAbsent(mockUser),
        createAccountIfAbsent(mockUser),
      ]);

      return mockUser;
    },
  });
};
