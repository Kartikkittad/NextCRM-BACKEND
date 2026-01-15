import swaggerJSDoc from "swagger-jsdoc";

const serverUrl = process.env.BASE_URL;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SmartCRM API",
      version: "1.0.0",
      description: "API documentation for SmartCRM backend",
    },
    servers: [
      {
        url: serverUrl,
        description: "Local server",
      },
      {
        url: serverUrl,
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], // where swagger comments live
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
