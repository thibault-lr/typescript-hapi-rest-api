import * as Hapi from "@hapi/hapi"
import {getRepository} from "typeorm"
import  UserModel from "./../../api/users/user.model"

/**
 * Validate that users exists in the database according to the id 
 * 
 * @param decoded Decoded object from jwt
 * @param request Hapi request object
 */
const validate = async  (decoded: any, request: Hapi.Request) => {
  try {
    const user:UserModel | undefined = await getRepository(UserModel).findOne(decoded.id);
    
    return { isValid: user } 
  } catch (e){
    console.error(e)
    return {isValid : false}
  }
}

async function init (server: Hapi.Server) {
  await server.register(require("hapi-auth-jwt2"))

  server.auth.strategy('jwt','jwt', {
    key: process.env.JWT_SECRET,
    validate : validate,
    verifyOptions: { algorithms: ['HS256']}
  });

  server.auth.default('jwt');
}


export default async (server: Hapi.Server) =>
  await init(server)