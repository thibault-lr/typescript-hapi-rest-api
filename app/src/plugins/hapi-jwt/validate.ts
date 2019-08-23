import * as Hapi from "@hapi/hapi"
import { getRepository } from "typeorm"
import UserModel from "./../../api/users/user.model"

/**
 * Validate that users exists in the database according to the id 
 * 
 * @param decoded Decoded object from jwt
 * @param request Hapi request object
 */
const validate = async (decoded: any, request: Hapi.Request) => {
  try {
    const user: UserModel | undefined = await getRepository(UserModel).findOne(decoded.id);
    
    if(!user) throw new Error("User not found");

    return { isValid: user }
  } catch (e) {
    console.error(e)
    return { isValid: false }
  }
}

export default {
  validate
}