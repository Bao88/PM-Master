const MongoClient = require("mongodb").MongoClient;

const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MONGODB_DB = process.env.MONGO_DB;

/* const MONGODB_URI = process.env.MONGODB_URI; */
/* const MONGODB_DB = process.env.MONGODB_DB; */

// Test enviroment
const DB_ENVIROMENTALS = [
  { env: "MONGO_DB_USER", value: MONGO_DB_USER },
  { env: "MONGO_DB_PASS", value: MONGO_DB_PASS },
  { env: "MONGO_DB_URI", value: MONGO_DB_URI },
];

DB_ENVIROMENTALS.forEach((envObject) => {
  if (!envObject.value) {
    throw new Error(
      `'Please define the ${envObject.env} environment variable inside .env.local'`
    );
  }
});

const DATABASE_URI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_URI}`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(DATABASE_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
/*
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */
