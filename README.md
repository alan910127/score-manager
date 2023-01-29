# Score Manager

Score management made easy

## Tech Stack

- [T3 stack](https://create.t3.gg):
  - [Next.js](https://nextjs.org)
  - [TailwindCSS](https://tailwindcss.com)
  - [Prisma](https://prisma.io)
  - [Auth.js](https://authjs.dev) (formerly known as NextAuth.js)
  - [tRPC](https://trpc.io)

## Contribution

Commit message: prefix with an [meaningful emoji](https://gitmoji.dev)

## Mocking Next Auth during Development

To mock NextAuth in development, you should set the environment variable `NEXT_PUBLIC_MOCK_ROLE` to `admin`, `ta` or `student` in your `.env` file.

⚠️ Switching between mocking or not needs manual refresh on the client side. ⚠️
