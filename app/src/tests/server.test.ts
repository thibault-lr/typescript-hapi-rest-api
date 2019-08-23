import Server from './../server';

describe('Server testing', () => {
  it('Should throw an error with bad infos', async () => {
    const server = new Server({host : "dummy", port: 0});

    let error;
    try {
      await server.start();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error).toEqual(new Error("Unable to start server"));
  })

  it('Should register the plugins correctly', async () => {
    const server = new Server({ host: "localhost", port: 4001 });
    await server.initPlugins();

    let registrationsKeys = Object.keys(server.getServer().registrations);

    expect(registrationsKeys).toEqual(["hapi-auth-jwt2"])
  })

  describe('Testing plugins with staging envs', () => {
    beforeAll( () => {
      process.env.NODE_ENV = "staging"
    })

    it('Should register the plugins correctly', async () => {
      const server = new Server({ host: "localhost", port: 4000 });
      await server.initPlugins();

      let registrationsKeys = Object.keys(server.getServer().registrations);

      expect(registrationsKeys).toEqual(["hapi-swagger","inert","vision","hapi-auth-jwt2"])
    })

    afterAll( () => {
      process.env.NODE_ENV = "test"
    })
  })
})