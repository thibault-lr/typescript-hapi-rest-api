import * as Hapi from "@hapi/hapi";
import { Connection } from "typeorm";

class UserController {
  constructor(private database: Connection) {
  }

  
  public async getUsersCount(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const users = await this.database.getRepository('User').count()
      return h.response({count : users})
    } catch (e) {
      console.error(e)
    }
  }
}

export default UserController;