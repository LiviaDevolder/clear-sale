/* eslint-disable @typescript-eslint/no-empty-function */
import mongoose from "mongoose"

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
    await mongoose.connect(process.env.DB_CONNECTION ?? '')
      .then()
      .catch((err) => console.log(err))
  }
}
