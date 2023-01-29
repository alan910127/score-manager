import type { Session, User } from "next-auth";

const roles = ["admin", "ta", "student"] as const;

export type Role = (typeof roles)[number];

export const mockRoles: Record<string, User> = {
  admin: {
    id: "0",
    name: "admin",
    email: "admin@example.com",
  },
  ta: {
    id: "1",
    name: "TA",
    email: "ta@example.com",
  },
  student: {
    id: "2",
    name: "Student",
    email: "student@example.com",
  },
};

export const getMockSession = (role?: string | null): Session | null => {
  // eslint-disable-next-line
  if (!roles.includes(role as any)) {
    return null;
  }

  const user = mockRoles[role as Role];
  const expires = new Date(Date.now() + 86400).toISOString();
  return { user, expires };
};
