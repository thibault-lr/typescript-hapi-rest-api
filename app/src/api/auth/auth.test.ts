import Server from './../../server'
import Database from './../../database';
import * as Bcrypt from "bcryptjs";
import { generateToken } from "./../../utilities/jwt";
import { getConnection } from "typeorm"

describe("Auth testing", () => {
  let server: Server;

  // start the server 
  beforeAll( async done => {
    server = new Server({host: "localhost", port:3003});
    await server.start()
    await Database.createConnection()
    server.initControllers();
    done();
  });

  afterAll( async done => {
    await server.getServer().stop()
  });

  describe("Auth - login", () => {
    beforeEach( async done => {
      const salt = Bcrypt.genSaltSync(10);
      const password = Bcrypt.hashSync("test",salt)
      await getConnection().query(
        `INSERT INTO users("name","department","login","password") VALUES('test','dep1','test','${password}')`
      );
      done();      
    });

    test("It should login the user", async done => {
      jest.mock("./auth.controller.ts")
      // jest.mock("generateToken", () => jest.fn());
      

      const options = {
        method: "POST",
        url: "/auth/login",
        payload: {
          login: "test",
          password: "test"
        }
      }
      const response = await server.getServer().inject(options);
      expect(response.statusCode).toBe(200)
      expect(response.result).toHaveProperty("token")
      done();
    })
  })
})