import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowRoles("ADMIN"), createUser);
router.get("/", protect, allowRoles("ADMIN"), getUsers);

export default router;
