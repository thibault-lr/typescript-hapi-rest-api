import * as Hapi from "@hapi/hapi";
import { userRoutes } from './user.routes';

export function init(server: Hapi.Server, routePrefix:String){
  userRoutes(server, routePrefix);
}