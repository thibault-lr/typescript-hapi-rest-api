import * as Jwt from "jsonwebtoken";
import  UserModel from "./../api/users/user.model";

import JWTConfig from "./../config/jwt"


const generateToken = (user: UserModel): String => {
    const payload = {id : user.id}
    return Jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn : JWTConfig.JWT_EXPIRES as unknown as string})
  }

export default {
  generateToken
} 