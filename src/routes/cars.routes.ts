import { Router } from "express";
import {
  createCarController,
  listCarsController,
  updateCarController,
  deleteCarController,
  listCarByUserIdController,
} from "../controllers/cars.controllers";
import { validateDataMdwr } from "../middlewares/validateDataMiddleware";
import {
  CarCreateRequestSchema,
  CarUpdateRequestSchema,
} from "../schemas/cars.schemas";
import { ensureCarExistsMdwr } from "../middlewares/cars/ensureCarExists.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/session/verifyTokenIsValidMiddleware";
import { ensureUserUuidExistsMdwr } from "../middlewares/users/ensureUserUuidExists.middleware";
import { checkOwnershipMiddleware } from "../middlewares/cars/ownership.middleware";

export const carsRouter = Router();

carsRouter.post(
  "",
  verifyTokenIsValidMiddleware,
  createCarController
);
carsRouter.get("", listCarsController);
carsRouter.get(
  "/:userUUID",
  verifyTokenIsValidMiddleware,
  ensureUserUuidExistsMdwr,
  listCarByUserIdController
);
carsRouter.patch(
  "/:carUUID",
  verifyTokenIsValidMiddleware,
  checkOwnershipMiddleware,
  ensureCarExistsMdwr,
  validateDataMdwr(CarUpdateRequestSchema),
  updateCarController
);
carsRouter.delete(
  "/:carUUID",
  verifyTokenIsValidMiddleware,
  checkOwnershipMiddleware,
  ensureCarExistsMdwr,
  deleteCarController
);
