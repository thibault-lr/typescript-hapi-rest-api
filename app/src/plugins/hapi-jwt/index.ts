import * as Hapi from "@hapi/hapi"
import {getRepository} from "typeorm"
import  UserModel from "./../../api/users/user.model"
import validate from './validate'

async function init (server: Hapi.Server) {
  await server.register(require("hapi-auth-jwt2"))

  server.auth.strategy('jwt','jwt', {
    key: process.env.JWT_SECRET,
    validate : validate.validate,
    verifyOptions: { algorithms: ['HS256']}
  });

  server.auth.default('jwt');
}


export default async (server: Hapi.Server) =>
  await init(server)