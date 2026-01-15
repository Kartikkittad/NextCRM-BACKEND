const BASE_URL = process.env.BASE_URL;

const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "SmartCRM API",
    version: "1.0.0",
    description: "Backend APIs for SmartCRM SaaS CRM Platform",
  },
  servers: [
    {
      url: BASE_URL,
      description: "API Server",
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
  tags: [
    { name: "Auth", description: "Authentication APIs" },
    { name: "Users", description: "User management (Admin only)" },
    { name: "Leads", description: "Lead management" },
  ],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Login user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "sales@smartcrm.com" },
                  password: { type: "string", example: "Sales@123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        role: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/leads": {
      get: {
        summary: "Get all leads",
        tags: ["Leads"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of leads",
          },
        },
      },
      post: {
        summary: "Create lead",
        tags: ["Leads"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string", example: "Acme Corp" },
                  email: { type: "string", example: "contact@acme.com" },
                  status: {
                    type: "string",
                    example: "NEW",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Lead created" },
        },
      },
    },

    "/api/leads/{id}/status": {
      patch: {
        summary: "Update lead status",
        tags: ["Leads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "string",
                    example: "QUALIFIED",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Status updated" },
        },
      },
    },
  },
};

export default openApiSpec;
