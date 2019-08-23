import DataBase from './../database';

describe("Database testing", () => {
  it('Should throw an error with bad credentials', async () => {
    // set dummy env variables
    process.env.DB_HOST="dummyhost";
    process.env.DB_PORT="0000";

    
    let error;
    try {
      await DataBase.createConnection();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error).toEqual(
      new Error("Unable to connect to database")
    );
  })
})