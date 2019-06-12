import Server from './server';
import Database from './database';

// configuration 
const NODE_HOST = process.env.NODE_HOST || "localhost";
const NODE_PORT = process.env.NODE_PORT || 3000;


( async  () => {
  const server = new Server({host: NODE_HOST, port: NODE_PORT});

  await server.start();
  
  try {
    await Database.createConnection();
    
    server.initControllers(Database.conn);
    
  } catch (error){
    console.error("Init err",error.stack);
    // process.exit(0);
  }
  
  console.log('started on env',process.env.NODE_ENV);


})()