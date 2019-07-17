import * as Hapi from "@hapi/hapi"

/*
 * Vision plugin
 *
 * @see https://github.com/hapijs/vision/blob/master/API.md#options
 */
const visionPlugin = {
  plugin: require("@hapi/vision"),
  options: {
    // add options here
  }
};

export default async (server: Hapi.Server) =>
  await server.register(visionPlugin);