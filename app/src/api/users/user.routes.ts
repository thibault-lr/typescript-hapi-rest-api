import * as Hapi from "@hapi/hapi"
import UserController from "./user.controller";
import { Connection } from "typeorm";
import RequestMethodEnum from './../../constants/RequestMethodEnum'

export function userRoutes(server: Hapi.Server, database: Connection){

    const userController = new UserController(database);
    server.bind(userController);

    //Get users
    server.route({
      method: RequestMethodEnum.Get,
      path: "/users",
      options: {
        handler: userController.getUsersCount,
        tags: ['api']
      }
    });


}