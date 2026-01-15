import swaggerUi from "swagger-ui-express";

const BASE_URL = process.env.BASE_URL;

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "NextCRM API",
    version: "1.0.0",
    description: "Backend APIs for NextCRM",
  },

  servers: [
    {
      url: BASE_URL,
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
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "sales@smartcrm.com" },
          password: { type: "string", example: "Sales@123" },
        },
      },

      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string", example: "SALES" },
        },
      },

      Lead: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          status: { type: "string", example: "NEW" },
          assignedTo: { type: "string" },
        },
      },
    },
  },

  security: [{ bearerAuth: [] }],

  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Leads" },
    { name: "Pipeline" },
    { name: "Dashboard" },
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
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },

    "/api/users": {
      post: {
        summary: "Create user (Admin only)",
        tags: ["Users"],
        responses: {
          201: { description: "User created" },
        },
      },
      get: {
        summary: "Get all users (Admin only)",
        tags: ["Users"],
        responses: {
          200: { description: "List of users" },
        },
      },
    },

    "/api/leads": {
      post: {
        summary: "Create lead",
        tags: ["Leads"],
        responses: {
          201: { description: "Lead created" },
        },
      },
      get: {
        summary: "Get all leads",
        tags: ["Leads"],
        responses: {
          200: { description: "Paginated leads list" },
        },
      },
    },

    "/api/leads/{id}": {
      get: {
        summary: "Get lead by ID",
        tags: ["Leads"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Lead details" },
        },
      },
      patch: {
        summary: "Update lead",
        tags: ["Leads"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Lead updated" },
        },
      },
      delete: {
        summary: "Delete lead",
        tags: ["Leads"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Lead deleted" },
        },
      },
    },

    "/api/leads/{id}/status": {
      patch: {
        summary: "Update lead status",
        tags: ["Pipeline"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Status updated" },
        },
      },
    },

    "/api/dashboard/metrics": {
      get: {
        summary: "Dashboard metrics",
        tags: ["Dashboard"],
        responses: {
          200: { description: "Dashboard KPIs" },
        },
      },
    },
  },
};

export default function setupSwagger(app) {
  const options = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "NextCRM API Docs",
    swaggerOptions: {
      url: "/api/docs.json",
    },
  };

  app.get("/api/docs.json", (req, res) => {
    res.json(swaggerSpec);
  });

  app.get("/api/docs", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>NextCRM API</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-standalone-preset.min.js"></script>
          <script>
            window.onload = function() {
              window.ui = SwaggerUIBundle({
                url: "/api/docs.json",
                dom_id: '#swagger-ui',
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout"
              });
            };
          </script>
        </body>
      </html>
    `);
  });
}
