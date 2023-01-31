import Cookies from "cookies";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CallbacksOptions, NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { decode, encode } from "next-auth/jwt";

const SECONDS_IN_DAY = 86400;
const COOKIES_SESSION_TOKEN = "next-auth.session-token";

const isCredentialCallback = (
  req: NextApiRequest,
  providerId: string
): boolean => {
  const { nextauth } = req.query;

  return Boolean(
    nextauth?.includes("callback") &&
      nextauth?.includes(providerId) &&
      req.method === "POST"
  );
};

const generateSessionToken = () => {
  return randomUUID();
};

const fromDate = (seconds: number, date = Date.now()) => {
  return new Date(date + seconds * 1000);
};

const createSession = async <WithVerificationToken>({
  adapter,
  userId,
  cookies,
}: {
  adapter: Adapter<WithVerificationToken>;
  userId: string;
  cookies: Cookies;
}) => {
  const sessionToken = generateSessionToken();
  const expires = fromDate(SECONDS_IN_DAY);

  await adapter.createSession({ userId, sessionToken, expires });

  cookies.set(COOKIES_SESSION_TOKEN, sessionToken, {
    expires,
    overwrite: true,
  });

  return { sessionToken, expires };
};

export const createSignInCallback = <WithVerificationToken = boolean>(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    adapter,
    providerId = "credentials",
  }: { adapter: Adapter<WithVerificationToken>; providerId?: string }
): CallbacksOptions["signIn"] => {
  return async ({ user }) => {
    if (isCredentialCallback(req, providerId)) {
      const cookies = new Cookies(req, res);
      await createSession({
        adapter,
        userId: user.id,
        cookies,
      });
    }

    return true;
  };
};

export const createSessionJWT = <WithVerificationToken = boolean>(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    adapter,
    providerId = "credentials",
  }: { adapter: Adapter<WithVerificationToken>; providerId?: string }
): NextAuthOptions["jwt"] => {
  return {
    async encode(params) {
      if (!isCredentialCallback(req, providerId)) {
        return encode(params);
      }
      const cookies = new Cookies(req, res);
      const sessionToken = cookies.get(COOKIES_SESSION_TOKEN);

      if (sessionToken == null) return "";

      const user = (await adapter.getSessionAndUser(sessionToken))?.user;
      if (!user || params.token?.sub == null || user.id === params.token.sub) {
        return sessionToken;
      }

      await adapter.deleteSession(sessionToken);

      const { sessionToken: newSessionToken } = await createSession({
        adapter,
        cookies,
        userId: params.token.sub,
      });

      return newSessionToken;
    },
    decode(params) {
      return isCredentialCallback(req, providerId) ? null : decode(params);
    },
  };
};
