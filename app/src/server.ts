import * as Hapi from "@hapi/hapi";
import * as Users from "./api/users";
import * as Auth from "./api/auth";

// plugins 
import VisionPlugin from "./plugins/vision";
import InertPlugin from "./plugins/inert";
import SwaggerPlugin from "./plugins/swagger";
import AuthPlugin from "./plugins/hapi-jwt";

class Server {

  private  _server: Hapi.Server;

  constructor(options: Hapi.ServerOptions){

    this._server = new Hapi.Server(options);

    this._setUpNodeExceptions();
  }

  async start(){
    try {
      await this._server.start();
      
      console.info('Server started on port', this._server.info.port);

    } catch (e) {
      console.error(e.stack);
      throw new Error('Unable to start server');
    }
    
  }

  initControllers(){
    Users.init(this._server,  "/v1")
    Auth.init(this._server, "/v1")

  }

  async initPlugins() {
     try {
      
      if(process.env.NODE_ENV === "staging"){
        await SwaggerPlugin(this._server);
        await InertPlugin(this._server);
        await VisionPlugin(this._server); 
      }

      await AuthPlugin(this._server);
    }
    catch (err) {
      console.error(err);
      throw new Error('Unable to register plugins');
    }
  }

  getServer(): Hapi.Server{
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