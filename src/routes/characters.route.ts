import express, { Router } from "express"
import { charactersController } from "../modules/characters"

const router: Router = express.Router()

router
  .post("/", charactersController.createCharacters)
  .get("/",charactersController.readAllCharacters)
  .get("/:id", charactersController.readCharacters)
  .put("/:id", charactersController.updateCharacters)
  .delete("/:id", charactersController.deleteCharacters)

export default router
