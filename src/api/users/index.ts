import * as Hapi from "@hapi/hapi";
import UserController from "./user-controller";
import { Connection } from "typeorm";

export function init(server: Hapi.Server, database: Connection) {
  const userController = new UserController(database);
  server.bind(userController);

  server.route({
    method: "GET",
    path: "/users",
    options: {
      handler: userController.getUsers
    }
  });
}
