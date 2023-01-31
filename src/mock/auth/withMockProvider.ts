import type { NextApiHandler } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { CredentialsConfig } from "next-auth/providers";
import { createSessionJWT, createSignInCallback } from "./callbacks";

type WithMockProvidersConfig = {
  provider: CredentialsConfig;
  enabled?: boolean;
};

export const withMockProvider = (
  authOptions: NextAuthOptions,
  config: WithMockProvidersConfig
): NextApiHandler => {
  const { provider, enabled = false } = config ?? {};
  const providerId =
    (provider.options?.id as string | undefined) ?? provider.id;
  const adapter = authOptions.adapter as Adapter;

  if (enabled) {
    authOptions.providers.push(provider);
  }

  return async (req, res) => {
    if (enabled) {
      authOptions.callbacks = {
        ...authOptions.callbacks,
        signIn: createSignInCallback(req, res, {
          adapter,
          providerId,
        }),
      };

      authOptions.jwt = createSessionJWT(req, res, {
        adapter,
        providerId,
      });
    }

    // eslint-disable-next-line
    return await NextAuth(req, res, authOptions);
  };
};
