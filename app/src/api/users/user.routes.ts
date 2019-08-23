import * as Hapi from "@hapi/hapi"
import * as Joi from "@hapi/joi"
import UserController from "./user.controller";
import RequestMethodEnum from './../../constants/RequestMethodEnum'

export function userRoutes(server: Hapi.Server, routePrefix:String = "/v1"){

    const userController = new UserController();
    server.bind(userController);

    //Get users
    server.route({
      method: RequestMethodEnum.Get,
      path: `${routePrefix}/users`,
      options: {
        handler: userController.getUsersCount,
        tags: ['api']
      }
    });

    // add users
    server.route({
      method: RequestMethodEnum.Post,
      path: "/users",
      options: {
        handler: userController.addUser,
        tags: ['api'],
        validate: {
          payload: {
            name: Joi.string().required().max(50),
            department: Joi.string().required()
          }
        }
      }
    })

  //get user
  server.route({
    method: RequestMethodEnum.Get,
    path: `${routePrefix}/users/{userId}`,
    options: {
      handler: userController.getUser,
      tags: ['api'],
      validate: {
        params: {
          userId: Joi.number().required()
        }
      }
    }
  })

  //update user
  server.route({
    method: RequestMethodEnum.Put,
    path: `${routePrefix}/users/{userId}`,
    options : {
      handler: userController.updateUser,
      tags: ['api'],
      validate: {
        params: {
          userId: Joi.number().required()
        },
        payload: {
          name: Joi.string().max(50),
          department: Joi.string()
        }
      }
    }
  })

  //delete user
  server.route({
    method: RequestMethodEnum.Delete,
    path: `${routePrefix}/users/{userId}`,
    options : {
      handler: userController.deleteUser,
      tags: ['api'],
      validate: {
        params : {
          userId: Joi.number().required()
        }
      }
    }
  })

  
}