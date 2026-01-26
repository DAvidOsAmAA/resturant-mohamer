import { Router } from "express";
import * as brandController from "./brand.controller.js";

const router = Router();
router.get("/", asyncHandler(brandController.getBrands));

router.post(
  "/create",
  isAuthenticated,
  isAuthorized(roles.admin),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.createBrandSchema),
  asyncHandler(brandController.createBrand),
);

router.put(
  "/:id",
  isAuthenticated,
  isAuthorized(roles.admin),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.updateBrandSchema),
  asyncHandler(brandController.updateBrand),
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized(roles.admin),
  validation(validators.deleteBrandSchema),
  asyncHandler(brandController.deleteBrand),
);

export default router;
