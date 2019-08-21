import * as Hapi from "@hapi/hapi";
import Boom from "boom";
import Errors from "./../../constants/Errors";

import User from "./user.model"
import { getRepository, getManager } from "typeorm";

class UserController {

  public async getUsersCount(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  
    const users = await getRepository("User").count();
    return h.response({ count: users });
  }

  public async addUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const newUser = getRepository("User")
        .create(request.payload);
      await getManager().save(newUser);

      return h.response({ message: "User successfully Added" });
    } catch (e) {
      console.error(e);
      return Boom.badRequest(Errors.INTERNAL);
    }
  }

  public async getUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const user = await getRepository("User")
        .findOne(request.params.userId);

      if (!user) throw new Error("User not found");

      return h.response({ user: user });
    } catch (e) {
      console.error(e);
      return Boom.notFound(e);
    }
  }

  public async updateUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {

      const user = await getRepository("User").findOne(request.params.userId) as User;

      if(! user) return Boom.notFound("User not found");

      //perform update
      const input = <User>request.payload;

      if(input.name) user.name = input.name;
      if(input.department) user.department = input.department;


       await getRepository("User").update(request.params.userId, user);

      return h.response({
        code: "USER_UPDATED",
        message: "User successfully updated"
      });
    } catch (e){
      console.error(e)
      return Boom.badRequest();
    }
  }


  public async deleteUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const user = await getRepository("User").findOne(request.params.userId) as User;

      if(! user) return Boom.notFound("User not found");

      //perform delete
      await getRepository("User").delete(request.params.userId);

      return h.response({code : "USER_DELETED",message : "User successfully deleted"})
    } catch (e) {
      console.error(e);
      return Boom.badRequest();
    }
  }
}

export default UserController;