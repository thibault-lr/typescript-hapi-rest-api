import * as hapi from "@hapi/hapi";
import * as Users from "./api/users";
import { Connection } from "typeorm";

class Server {

  private  _server: hapi.Server;

  constructor(options: hapi.ServerOptions){

    this._server = new hapi.Server({host: options.host, port: options.port});

    this._setUpNodeExceptions();
  }

  async start(){
    try {
      await this._server.start();
      console.info('Server started on port', this._server.info.port);

    } catch (e) {
      console.error(e.stack);
    }
    
  }

  initControllers(database:Connection){
    Users.init(this._server, database)
  }

  getServer(): hapi.Server{
    return this._server;
  }


  private _setUpNodeExceptions() {
    //set up server exceptions
    process.on("uncaughtException", (error: Error) => {
      console.error("uncaughtException",error.stack);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });
  }
}

export default Server