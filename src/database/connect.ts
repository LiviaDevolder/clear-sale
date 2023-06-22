import { MongoClient } from "mongodb"

export default class Database {
  private static instance: Database

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

  public async connect() {
    const client = new MongoClient(process.env.DB_CONNECTION!)
    await client.connect().then((connection) =>
      connection.db(process.env.DB_DATABASE)
    )
  }
}
