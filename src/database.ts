import { createConnection, Connection, EntitySchema } from "typeorm";
import { User } from "./api/users/user.model";

class Database {
  public static conn: Connection;

  public static async createConnection() {
    try {
      this.conn = await createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: "postgres",
        password: "postgres",
        database: "analytics",
        entities: [User],
        synchronize: true,
        logging: true
      });
    } catch (e) {
      console.error(e.stack);
      throw e;
    }
  }

} 

export default Database;