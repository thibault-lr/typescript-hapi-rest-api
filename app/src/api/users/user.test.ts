import  * as Server from '../../server';
import * as Database from './../../database';




describe("User Testing", function() {
  let server: Server.default;

  beforeAll( async done => {
    server = new Server.default({ host: "localhost", port: 3000 });
    await server.start()
    await Database.default.createConnection()
    server.initControllers(Database.default.conn);
    done();
  });

  afterAll( async done => {

    await Database.default.conn.query("DELETE FROM users");

    //reset the sequence 
    await Database.default.conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await Database.default.conn.query("UPDATE users SET id=nextval('users_id_seq')")
    done();
  })

  test("Should return the number of users", async (done) => {

    jest.mock('./user.controller.ts')
    

    const options = {
      method: 'GET',
      url: '/users',
    };
    const response = await server.getServer().inject(options);

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual({
      count : 0
    })
    done()
  });


  test("It should add a user", async (done) => {
    jest.mock('./user.controller.ts');

    const options = {
      method: 'POST',
      url: '/users',
      payload : {
        name: 'test',
        department: 'test'
      }
    }

    const response = await server.getServer().inject(options);

    expect(response.statusCode).toBe(200);
    done();
  })

  test("It should not create a user with bad payload", async (done) => {
    jest.mock("./user.controller.ts");

    const options = {
      method: "POST",
      url: "/users",
      payload: {
        name: "test" //no department provided
      }
    };
    const response = await server.getServer().inject(options);

    expect(response.statusCode).toBe(400);
    done();
  })

  describe("User - inserted rows", function() {

    // add a random user 
    beforeEach( async done => {
      await Database.default.conn.query(`INSERT INTO users("name","department") VALUES('test','dep1')`);
      done();
    })

    test("It should retried a user with an id", async done => {
      jest.mock("./user.controller.ts");

      const options = {
        method: "GET",
        url: "/users/1"
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(200);

      done();
    });

    test("It should return a 404 if the user does not exist", async done => {
      jest.mock("./user.controller.ts");

      const options = {
        method: "GET",
        url: "/users/1234"
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(404);
      expect(response.result).toEqual({
        statusCode: 404,
        error: "Not Found",
        message: "User not found"
      });

      done();
      
    })

    test('It should correctly update a user', async done => {
      const options = {
        method: "PUT",
        url: "/users/1",
        payload: {
          name: "test123"
        }
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(200);
      

      done();      
    })

    test('It should not update when user is not found', async done => {
      const options = {
        method: "PUT",
        url: "/users/1234",
        payload: {
          name: "test123"
        }
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(404);
      

      done();      
    })

    test('It should correctly delete a user', async done => {
      const options = {
        method: "DELETE",
        url: "/users/1",
        payload: {
          name: "test123"
        }
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(200);
      

      done();      
    })

    test('It should not delete when user is not found', async done => {
      const options = {
        method: "DELETE",
        url: "/users/1234",
        payload: {
          name: "test123"
        }
      };

      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(404);
      

      done();      
    })
  })
  


});
