const mongoose = require("mongoose");

class DatabaseSingleton {
  constructor(MONGO_URL) {
    if (!DatabaseSingleton.instance || DatabaseSingleton.instance.MONGO_URL !== MONGO_URL) {
      this.connect(MONGO_URL);
      DatabaseSingleton.instance = this;
      DatabaseSingleton.instance.MONGO_URL = MONGO_URL;
    } else {
        console.log("You are trying to create duplicate instances which is not allowed");
    }

    return DatabaseSingleton.instance;
  }

  async connect(MONGO_URL) {
    try {
      this.db = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("MongoDb is connected");

      this.db.connection.on('error', (err) => {
        console.error('MongoDb connection error:', err);
      });
    } catch (err) {
      console.error("❌ Error connecting to MongoDb", err);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.db && this.db.connection) {
      try {
        await this.db.connection.close();
        console.log('Server closed. Database instance disconnected.');
        process.exit(0);
      } catch (err) {
        console.error('Error closing database connection:', err);
        process.exit(1);
      }
    } else {
      console.log('No active database connection to close.');
      process.exit(0);
    }
  }
}

module.exports = DatabaseSingleton;
