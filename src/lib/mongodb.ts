import * as mongoDB from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConnection: mongoDB.Db = null;

export default async function connectToDatabase(): Promise<mongoDB.Db> {
  if (cachedConnection) {
    console.log("✔️ Using Cached Connection to MonogDB");
    return cachedConnection;
  }

  try {
    console.log("⚠ New Connection to MonogDB");

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.MONGODB_DB);

    cachedConnection = db;
    return db;
  } catch (err) {
    console.log(err);
  }

  return null;
}
