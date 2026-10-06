import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  // With logger: true, Drizzle prints every SQL statement and its parameters to the console as your app handles requests
  // Remember to turn logging off in production to avoid cluttering your logs
  // logger: true,
})