import express, { Router } from "express"
import { locationsController } from "../modules/locations"

const router: Router = express.Router()

router
  .post("/", locationsController.createLocations)
  .get("/",locationsController.readAllLocations)
  .get("/:id", locationsController.readLocations)
  .put("/:id", locationsController.updateLocations)
  .delete("/:id", locationsController.deleteLocations)

export default router
