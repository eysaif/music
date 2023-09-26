import { MongoClient } from "mongodb";

export async function connectToDatabase() {
const uri =  process.env.MONGODB_URI;
// const options: any = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };


if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

// Connect to cluster
let client = new MongoClient(uri);
await client.connect();
let db = client.db(process.env.MONGODB_DB);


return {
  client: client,
  db: db,
};
}