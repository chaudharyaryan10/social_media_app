const { MongoClient } = require("mongodb");

// Local DB
const LOCAL_URI = "mongodb://127.0.0.1:27017/socialmedia";

// Remote DB (Atlas) → password "admin@1234" is URL encoded as "admin%401234"
const REMOTE_URI =
  "mongodb+srv://admin:admin%401234@sociafy.xfab9iz.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=Sociafy";

// Collections to migrate
const collections = [
  "users",
  "posts",
  "comments",
  "postlikes",
  "follows",
  "messages",
  "conversations",
];

async function migrate() {
  const localClient = new MongoClient(LOCAL_URI);
  const remoteClient = new MongoClient(REMOTE_URI);

  try {
    await localClient.connect();
    await remoteClient.connect();
    console.log("✅ Connected to both databases");

    const localDb = localClient.db("socialmedia");
    const remoteDb = remoteClient.db("socialmedia");

    for (const name of collections) {
      const localCol = localDb.collection(name);
      const remoteCol = remoteDb.collection(name);

      const docs = await localCol.find({}).toArray();
      if (!docs.length) {
        console.log(`⚠️ No documents found in ${name}`);
        continue;
      }

      // Clear existing remote data
      await remoteCol.deleteMany({});
      await remoteCol.insertMany(docs);
      console.log(`✅ Migrated ${docs.length} docs → ${name}`);
    }

    console.log("🎉 Migration completed successfully");
  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await localClient.close();
    await remoteClient.close();
  }
}

migrate();
