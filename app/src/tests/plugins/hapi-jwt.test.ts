import validate from "./../../plugins/hapi-jwt/validate"
import Database from '../../database';
import * as Bcrypt from "bcryptjs";
import * as Hapi from "@hapi/hapi"
import { getConnection, getRepository } from "typeorm";
import User from "./../../api/users/user.model";




describe("Auth testing", () => {
  let userSqlObj:any;
  

  // start the server 
  beforeAll(async done => {

    await Database.createConnection()

    // add account 
    const salt = Bcrypt.genSaltSync(10);
    const password = Bcrypt.hashSync("test", salt);
    userSqlObj = await getConnection().query(
      `INSERT INTO "users"("name", "department", "login", "password") VALUES('testauthvalidate', 'dep1', 'test', '${password}') RETURNING id`);    
    await getConnection().query
    done();
  });


  afterAll( async done => {
    await getConnection().query(`DELETE FROM "users" WHERE id=${userSqlObj[0].id}`)
    done();
  })


  test('It should validate a token', async () => {
    let insertedUser: User | undefined = await getRepository(User).findOne({ id: userSqlObj[0].id });
    let validReturnedValue = await validate.validate(insertedUser, <Hapi.Request>{})

    expect(validReturnedValue).toEqual({
      isValid: insertedUser
    })
  })

  test("It should not validate a token", async () => {
    const user = new User()
    user.id = 2093;

    let validReturnedValue = await validate.validate(user, <Hapi.Request>{})

    expect(validReturnedValue).toEqual({isValid: false})
  })

  

});