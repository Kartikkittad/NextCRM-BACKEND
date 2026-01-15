import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/utils/connectDb.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Only listen locally (NOT on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
