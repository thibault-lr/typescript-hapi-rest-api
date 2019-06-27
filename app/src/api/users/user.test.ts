import  * as Server from '../../server';
import * as Database from './../../database';



describe("Server Testing", function() {
  let server: Server.default;

  beforeAll( async done => {
    server = new Server.default({ host: "localhost", port: 3000 });
    await server.start()
    await Database.default.createConnection()
    server.initControllers(Database.default.conn);
    done();
  })

  test("should validate if server is running", async (done) => {

    jest.mock('./user.controller.ts')
    

    const options = {
      method: 'GET',
      url: '/users',
    };
    const response = await server.getServer().inject(options);

    expect(response.statusCode).toBe(200);
    done()
  });

});

// describe('messages controller', () => {

//   const userId  = 42;
//   const options = {
//     method: 'GET',
//     url: '/messages',
//     headers: { 'Authorization': Token.generate(userId) }
//   };


//   test('responds with success for ping', (done) => {

//     const returnValue = [{ foo: 'bar' }];

//     const mockMessages = jest.fn();
//     mockMessages.mockReturnValue(returnValue);
//     MessagesService.getAllMessagesForUser = mockMessages;

//     Server.inject(options, (response) => {

//       expect(response.statusCode).toBe(200);
//       expect(response.result).toBe(returnValue);
//       done();
//     });
//   });
