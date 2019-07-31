import { createConnection, Connection } from "typeorm";
import  User from "./api/users/user.model";

class Database {
  public static conn: Connection;

  public static async createConnection() {
    try {
      this.conn = await createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User],
        synchronize: true,
        logging: true
      });
    } catch (e) {
      console.error(e.stack);
      throw new Error('Unable to connect to database');
    }
  }

} 

export default Database;