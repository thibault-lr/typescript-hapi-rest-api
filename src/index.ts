import Server from './Server';

( async  () => {
  const server = new Server(3000);

  await server.start();
  console.log('started on env',process.env.NODE_ENV);

})()