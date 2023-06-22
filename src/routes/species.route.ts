import express, { Router } from "express"
import { speciesController } from "../modules/species"

const router: Router = express.Router()

router
  .route("/")
  .post(speciesController.createSpecies)

router
  .route("/")
  .get(speciesController.readAllSpecies)

router
  .route("/:id")
  .get(speciesController.readSpecies)

router
  .route("/:id")
  .put(speciesController.updateSpecies)

export default router