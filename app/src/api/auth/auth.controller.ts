import * as Hapi from "@hapi/hapi"
import Boom from "@hapi/boom"
import { getRepository } from "typeorm";
import JWTUtils  from "./../../utilities/jwt"

import UserModel from "./../users/user.model";
import User from "./../users/user.model";

interface ILoginRequest extends Hapi.Request {
  payload: {
    login: string,
    password: string
  }
}

class AuthController {

  public async login(request: ILoginRequest, h: Hapi.ResponseToolkit){
    const { login, password } = request.payload;

    let user: UserModel | undefined;
    try {
      user = await getRepository(User).findOne({login: login});
    

    if (!user) return Boom.notFound("User does not exists");

    if (!user.validatePassword(password)) {
      return Boom.unauthorized("Invalid password");
    }

    return { token: JWTUtils.generateToken(user) };
    } catch (error) {
      return Boom.unauthorized();
    }
  }
  
}

export default AuthController