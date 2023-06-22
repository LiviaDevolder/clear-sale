import express, { Request, Response } from "express";

const router = express.Router();

router.get('/api', [], (req: Request, res: Response) => {
  return res.send('Hello World!')
})

export { router }
