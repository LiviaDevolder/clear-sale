import express, { Router } from "express"
import { speciesController } from "../modules/species"

const router: Router = express.Router()

router
  .post("/", speciesController.createSpecies)
  .get("/",speciesController.readAllSpecies)
  .get("/:id", speciesController.readSpecies)
  .put("/:id", speciesController.updateSpecies)
  .delete("/:id", speciesController.deleteSpecies)

export default router
