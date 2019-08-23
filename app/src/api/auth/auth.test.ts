import Server from '../../server'
import Database from '../../database';
import * as Bcrypt from "bcryptjs";
import JWTUtils from "../../utilities/jwt";
import { getConnection } from "typeorm"

describe("Auth testing", () => {
  let server: Server;

  // start the server 
  beforeAll( async done => {
    server = new Server({host: "localhost", port:4003});
    await server.start()
    await Database.createConnection()
    server.initControllers();
    done();
  });

  afterAll( async done => {

    await server.getServer().stop();
    done();
  });

  describe("Auth - login", () => {

    let userSqlObj:any; 
    beforeAll( async done => {
      const salt = Bcrypt.genSaltSync(10);
      const password = Bcrypt.hashSync("test",salt);
      userSqlObj = await getConnection().query(
        `INSERT INTO "users"("name", "department", "login", "password") VALUES('test', 'dep1', 'testauth', '${password}') RETURNING id`      );
      done();      
    });

    afterAll( async done => {
      await getConnection().query(`DELETE FROM users WHERE id=${userSqlObj[0].id}`);
      done();
    })

    test("It should login the user", async done => {
      // jest.mock("./auth.controller.ts")
      JWTUtils.generateToken = jest.fn( () => "token")

      const options = {
        method: "POST",
        url: "/v1/auth/login",
        payload: {
          login: "testauth",
          password: "test"
        }
      }
      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(200)
      expect(response.result).toHaveProperty("token")
      expect(JWTUtils.generateToken).toHaveBeenCalledTimes(1)
      done();
    })


    test("It should not generate a token with bad credentials", async done  => {
      const options = {
        method: "POST",
        url: "/v1/auth/login",
        payload: {
          login: "testauth",
          password: "wrongpassword"
        }
      }
      const response = await server.getServer().inject(options);    
      expect(response.statusCode).toBe(401) 
      expect(response.result).toEqual({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid password"
      });

      done();
    })

    test("It should return a not found error ", async done => {
      const options = {
        method: "POST",
        url: "/v1/auth/login",
        payload: {
          login: "notfounduser",
          password: "wrongpassword"
        }
      }
      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(404)
      expect(response.result).toEqual({
        statusCode: 404,
        error: "Not Found",
        message: "User does not exists"
      });

      done();
    })
  })
})