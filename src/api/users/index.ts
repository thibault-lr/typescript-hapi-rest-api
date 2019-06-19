import * as Hapi from "@hapi/hapi";
import { userRoutes } from './user.routes';
import { Connection } from "typeorm";

export function init(server: Hapi.Server, database: Connection){
  userRoutes(server, database);
}