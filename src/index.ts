import { json } from 'body-parser'
import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'

const app = express()
app.use(json())
app.use(router)

dotenv.config()
const port = process.env["PORT"]!

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
