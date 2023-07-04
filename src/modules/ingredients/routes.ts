import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../shared/middlewares/authMiddleware";
import { createIngredientController } from "./controller";

const router = Router();

router.post("/", authenticate, authorize, createIngredientController);

export default router;
