import { Router } from "express";
import { authRoutes } from "./auth";

import { todoRoutes } from "./todo";

const router: Router = Router()

router.use(authRoutes);

router.use(todoRoutes)

export const combinedRoutes: Router = router