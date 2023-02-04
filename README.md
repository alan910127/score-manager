# Score Manager

Score management made easy

## Tech Stack

- [T3 stack](https://create.t3.gg):
  - [Next.js](https://nextjs.org)
  - [TailwindCSS](https://tailwindcss.com)
  - [Prisma](https://prisma.io)
  - [Auth.js](https://authjs.dev) (formerly known as NextAuth.js)
  - [tRPC](https://trpc.io)
- [HeadlessUI](https://headlessui.com)

## Run Locally

Fisrt, make sure you have [Docker](https://www.docker.com) setup in your system

Setup the environment variables

```bash
  cp .env.example .env
```

> You might need to set the environment variables `NYCUAUTH_CLIENT_ID` and `NYCUAUTH_CLIENT_SECRET` to be able to use the real NYCU Auth

Spin up the docker containers

```bash
  docker compose up
```

Then there will be two web running:

- Score Manager: http://localhost:3000
- Prisma Studio: http://localhost:5555 (GUI for database management / inspection)

## Contribution

Commit message: prefix with an [meaningful emoji](https://gitmoji.dev)

## Mocking NextAuth during Development

To mock NextAuth in development, you should set the environment variable `NEXT_PUBLIC_MOCK_NEXTAUTH` to `true` in your `.env` file.
