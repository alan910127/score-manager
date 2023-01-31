import type { NextApiHandler } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { CredentialsConfig } from "next-auth/providers";
import { createSessionJWT, createSignInCallback } from "./callbacks";

type WithMockProvidersConfig = {
  adapter: Adapter;
  provider: CredentialsConfig;
  enabled?: boolean;
};

export const withMockProvider = (
  authOptions: NextAuthOptions,
  config: WithMockProvidersConfig
): NextApiHandler => {
  const { provider, adapter, enabled = false } = config ?? {};
  const providerId =
    (provider.options?.id as string | undefined) ?? provider.id;

  if (enabled) {
    authOptions.providers.push(provider);
  }

  return async (req, res) => {
    authOptions.callbacks = {
      ...authOptions.callbacks,
      signIn: createSignInCallback(req, res, {
        adapter,
        providerId,
      }),
    };
    authOptions.jwt = createSessionJWT(req, res, providerId);

    // eslint-disable-next-line
    return await NextAuth(req, res, authOptions);
  };
};
