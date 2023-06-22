import { json } from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import { router } from './routes'
import dotenv from 'dotenv'

const app = express()
app.use(json())
app.use(router)

dotenv.config()
const port = process.env["PORT"]!

mongoose.connect(process.env["DB_CONNECTION"]!).then(() => {
  console.log("Connected to database")
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
