import express, { Router } from "express"
import { speciesController } from "../modules/species"

const router: Router = express.Router()

router
  .route("/")
  .post(speciesController.createSpecies)

router
  .route("/")
  .get(speciesController.readAllSpecies)

export default router