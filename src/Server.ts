import * as hapi from "@hapi/hapi";

class Server {

  private  _server: hapi.Server;

  constructor(port:number){
    this._server = new hapi.Server({host: 'localhost',port: port});

    this._server.route({
      method: 'GET',
      path: '/',
      handler: (request: hapi.Request, h: hapi.ResponseToolkit): hapi.ResponseObject => {
        return h.response('test2')
      }
    })
  }

  async start(){
    console.log('start');
    try {
      await this._server.start();
      console.info('Server started on port', this._server.info.port);

    } catch (e) {
      console.log('err');
      console.error(e.stack);
    }
    
  }
}

export default Server