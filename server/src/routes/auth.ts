import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";

const router = Router();

router.post("/signIn", signIn);

router.post("/signUp", signUp);

export const authRoutes: Router = router;