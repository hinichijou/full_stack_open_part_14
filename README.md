# full_stack_open_part_14

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## About testing
The next.js application behaves differently when running in development or when running a build. The application should always be tested by running `npm run build` && `npm start` in addition to dev environment testing to catch bugs related to relying on dev environment behaviour.

## About ORM and migrations

The project uses Drizzle ORM which can be installed with:
```
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

We also need the following packages for Drizzle Kit CLI: `npm install --save-dev dotenv postgres`.

The database schema is defined in `db/schema.ts`. Database connection is created in `db/index.ts`. Drizzle is configured in `drizzle.config.ts`. The files expect the process.env has the variable `DATABASE_URL` defined.

After the previous are in place we can generate a migration with `npx drizzle-kit generate`. The migration generates an sql file in the `drizzle` folder, it should be checked that the contents make sense before applying the migration. The migration can be applied to the database with `npx drizzle-kit migrate`.

The database can be inspected and modified with Drizzle Studio which can be opened with `npx drizzle-kit studio`.

In case a fresh database is required remove Drizzle's migration tracking from the database and drop all the tables you have created with:
```
DROP TABLE IF EXISTS drizzle.__drizzle_migrations CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

Then remove the local migration history so that Drizzle Kit forgets all previously generated migrations with `npx drizzle-kit drop`.

The command lets you select which migration entries to remove from the local journal. After dropping them, you can regenerate and reapply everything cleanly with:
```
npx drizzle-kit generate
npx drizzle-kit migrate
```