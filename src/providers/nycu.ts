import type { OAuthUserConfig, Provider } from "next-auth/providers";

export default function NYCUProvider({
  clientId,
  clientSecret,
}: OAuthUserConfig<{}>): Provider {
  return {
    id: "nycu",
    name: "NYCU",
    type: "oauth",
    authorization: {
      url: "https://id.nycu.edu.tw/o/authorize/",
      params: { response_type: "code", scope: "profile" },
    },
    token: "https://id.nycu.edu.tw/o/token/",
    userinfo: "https://id.nycu.edu.tw/api/profile/",
    profile(profile) {
      console.log(profile);
      return {
        id: profile.username,
        email: profile.email,
      };
    },

    clientId,
    clientSecret,
  };
}
