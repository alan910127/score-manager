import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NYCUProfile extends Record<string, any> {
  username: string;
  email: string;
}

export default function NYCUProvider<P extends NYCUProfile>({
  clientId,
  clientSecret,
}: OAuthUserConfig<P>): OAuthConfig<P> {
  return {
    id: "nycu",
    name: "NYCU",
    type: "oauth",

    authorization: {
      url: "https://id.nycu.edu.tw/o/authorize/",
      params: { scope: "profile" },
    },
    token: "https://id.nycu.edu.tw/o/token/",
    userinfo: "https://id.nycu.edu.tw/api/profile/",

    profile(profile) {
      return {
        id: profile.username,
        email: profile.email,
      };
    },

    clientId,
    clientSecret,
  };
}
