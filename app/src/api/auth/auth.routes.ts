import * as Hapi from "@hapi/hapi"
import * as Joi from "@hapi/joi"
import AuthController from "./auth.controller"
import { Connection } from "typeorm";

export function authRoutes(server: Hapi.Server, routePrefix:String){
  const authController = new AuthController();
  server.bind(authController);

  server.route({
    method: "POST",
    path: `${routePrefix}/auth/login`,
    options: {
      handler: authController.login,
      validate: {
        payload: {
          login: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      tags: ['api'],
      auth: false
    }
  });
}