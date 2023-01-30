import { env } from "@/env/client.mjs";
import {
  useSession as useNextAuthSession,
  type SessionContextValue,
  type UseSessionOptions,
} from "next-auth/react";
import { getMockSession } from "./mockSession";

export const useSession = <R extends boolean>(
  options?: UseSessionOptions<R>
):
  | SessionContextValue<R>
  | { readonly data: null; readonly status: "loading" } => {
  const nextAuthSession = useNextAuthSession(options);

  const mockedRole = env.NEXT_PUBLIC_MOCK_ROLE;

  if (mockedRole == null) {
    return nextAuthSession;
  }

  const session = getMockSession(mockedRole);
  if (session == null) {
    return { data: null, status: "loading" };
  }

  return {
    data: session,
    status: "authenticated",
  } as SessionContextValue<R>;
};
