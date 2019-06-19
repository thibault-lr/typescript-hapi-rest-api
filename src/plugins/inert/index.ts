import * as Hapi from "@hapi/hapi"

/**
 * Inert plugin 
 * 
 * @see https://github.com/hapijs/inert#server-options
 */
const inertPlugin = {
  plugin: require("@hapi/inert"),
  options: {
    // in case of further server options to this plugin
  }
};

export default async (server: Hapi.Server) =>
  await server.register(inertPlugin);