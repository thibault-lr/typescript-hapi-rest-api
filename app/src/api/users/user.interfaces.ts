import { Request } from "@hapi/hapi";

export interface IChangePasswordRequest extends Request {
  payload : {
    old_password: string,
    new_password: string
  }
}
