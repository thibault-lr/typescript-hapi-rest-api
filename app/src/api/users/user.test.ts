import Server from '../../server';
import {getConnection} from "typeorm"
import Database from '../../database';
import * as Bcrypt from "bcryptjs"
import User from './user.model';



describe("User Testing", function() {
  let server: Server;

  beforeAll( async done => {
    server = new Server({ host: "localhost", port: 3000 });
    await server.start()
    await Database.createConnection()

    server.initControllers();
    done();
  });

  afterAll( async done => {
    await server.getServer().stop()
    done();
  })


  test("Should return the number of users", async (done) => {

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

    let userSqlObj: any;
    // add a random user 
    beforeEach( async done => {
      userSqlObj = await getConnection().query(`INSERT INTO users("name","department") VALUES('test','dep1') RETURNING id`);
      done();
    });

    afterEach( async done => {
      await getConnection().query(`DELETE FROM users`);
      done()
    })

    test("It should retried a user with an id", async done => {
      jest.mock("./user.controller.ts");

      const options = {
        method: "GET",
        url: `/users/${userSqlObj[0].id}`
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
        url: `/users/${userSqlObj[0].id}`,
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
        url: `/users/${userSqlObj[0].id}`,
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


  test('It should compare passwords correctly', () => {
    const salt = Bcrypt.genSaltSync(10);
    const password = Bcrypt.hashSync("test", salt);

    const userM = new User()
    userM.password = password;

    expect(userM.validatePassword("test")).toBe(true)
  })
  


});
