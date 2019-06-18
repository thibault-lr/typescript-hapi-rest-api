import * as Server from './../server';

describe('Server testing', () => {
  it('Should throw an error with bad infos', async () => {
    const server = new Server.default({host : "dummy", port: 0});

    let error;
    try {
      await server.start();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error).toEqual(new Error("Unable to start server"));
  })
})