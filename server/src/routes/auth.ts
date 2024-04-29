import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { validateSignInBody, validateSignUpBody } from "../middleware/validation";

const router = Router();

router.post("/signUp", validateSignUpBody, signUp);

router.post("/signIn", validateSignInBody, signIn);

export const authRoutes: Router = router;
