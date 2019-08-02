import * as Hapi from "@hapi/hapi";
import { authRoutes } from "./auth.routes";

export function init(server: Hapi.Server) {
  authRoutes(server);
}
