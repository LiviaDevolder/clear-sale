import express, { Router } from "express"
import { weaponsController } from "../modules/weapons"

const router: Router = express.Router()

router
  .post("/", weaponsController.createWeapons)
  .get("/",weaponsController.readAllWeapons)
  .get("/:id", weaponsController.readWeapons)
  .put("/:id", weaponsController.updateWeapons)
  .delete("/:id", weaponsController.deleteWeapons)

export default router
