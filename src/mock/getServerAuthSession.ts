import { env } from "@/env/server.mjs";
import { getServerAuthSession as getServerSession } from "@/server/auth";
import { getMockSession } from "./mockSession";

export const getServerAuthSession: typeof getServerSession = async (ctx) => {
  const mockedRole = env.NEXT_PUBLIC_MOCK_ROLE;
  if (mockedRole == null) {
    return await getServerSession(ctx);
  }

  const session = getMockSession(mockedRole);
  return session;
};
