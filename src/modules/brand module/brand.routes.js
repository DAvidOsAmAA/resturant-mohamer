import { Router } from "express";
import * as brandController from "./brand.controller.js";
import { asynchandler } from "../../utilis/asyncHandler.js";
import { uploadSingleImage } from "../../utilis/multer.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";
import validate from "../../middlewares/validate.js";
import * as validators from "./brand.validation.js";

const router = Router();

router.get("/", asynchandler(brandController.getBrands));

router.post(
  "/create",
  auth,
  role("ADMIN"),
  uploadSingleImage("image"),
  validate(validators.createBrand),
  asynchandler(brandController.createBrand),
);

router.put(
  "/:id",
  auth,
  role("ADMIN"),
  uploadSingleImage("image"),
  validate(validators.updateBrand),
  asynchandler(brandController.updateBrand),
);

router.delete(
  "/:id",
  auth,
  role("ADMIN"),
  validate(validators.deleteBrand),
  asynchandler(brandController.deleteBrand),
);

export default router;

