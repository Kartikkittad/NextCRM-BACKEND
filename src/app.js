import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import setupSwagger from "./utils/swagger.js";

const swaggerUiAssets = swaggerUi.serveFiles(swaggerSpec);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);

app.use("/api/docs", swaggerUiAssets, swaggerUi.setup(swaggerSpec));

export default app;
