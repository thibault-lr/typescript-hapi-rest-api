import * as Hapi from "@hapi/hapi";

/**
 * Define swagger plugin 
 * 
 * @see https://github.com/glennjones/hapi-swagger/blob/master/optionsreference.md
 */
const swaggerPlugin = {
  plugin: require("hapi-swagger"),
  options: {
    info: {
      title: "Swagger doc api",
      description: `Documentation `,
      version: `Version 0.0.1`
    },
    swaggerUI: true,
    documentationPage: true,
    documentationPath: "/docs",
    securityDefinitions: {
      "api_key": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
      }
    }

  }
};

export default async (server: Hapi.Server) => 
  await server.register(swaggerPlugin);