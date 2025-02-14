import express from "express";
import { fetchUserData, updateUserData, getRankedUsers } from "../controller/api.js";

const router = express.Router();
router.get("/fetch-user-data", fetchUserData);
router.post("/update-user-data", updateUserData);
router.get("/ranked-users", getRankedUsers);

export default router;