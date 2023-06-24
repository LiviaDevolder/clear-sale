import express, { Router } from "express"
import { musicsController } from "../modules/musics"

const router: Router = express.Router()

router
  .post("/", musicsController.createMusics)
  .get("/",musicsController.readAllMusics)
  .get("/:id", musicsController.readMusics)
  .put("/:id", musicsController.updateMusics)
  .delete("/:id", musicsController.deleteMusics)

export default router
