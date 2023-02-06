import { Router } from "express";
import { signin, signup } from "../controllers/auth.js";
import { getUser } from "../controllers/user.js";
import verifyToken from "../middlewares/authJwt.js";
import checkDuplicateUsernameOrEmail from "../middlewares/verifySignUp.js";

const router = Router();

router.post("/signin", signin);

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);

router.get("/user/:username", [verifyToken], getUser);

export default router;
