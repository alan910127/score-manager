import type { User } from "next-auth";

const roles = ["admin", "ta", "student"] as const;

export type Role = (typeof roles)[number];

export const mockUsers: Record<string, User> = {
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
