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
      const sessionToken = generateSessionToken();
      const expires = fromDate(SECONDS_IN_DAY);

      await adapter.createSession({ userId: user.id, sessionToken, expires });

      const cookies = new Cookies(req, res);
      cookies.set(COOKIES_SESSION_TOKEN, sessionToken, { expires });
    }

    return true;
  };
};

export const createSessionJWT = (
  req: NextApiRequest,
  res: NextApiResponse,
  providerId = "credentials"
): NextAuthOptions["jwt"] => {
  return {
    encode(params) {
      if (!isCredentialCallback(req, providerId)) {
        return encode(params);
      }
      const cookies = new Cookies(req, res);
      const sessionToken = cookies.get(COOKIES_SESSION_TOKEN);
      return sessionToken ?? "";
    },
    decode(params) {
      return isCredentialCallback(req, providerId) ? null : decode(params);
    },
  };
};
