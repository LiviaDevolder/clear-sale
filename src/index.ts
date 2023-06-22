import { json } from 'body-parser'
import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'
import Database from './database/connect'

const app = express()
app.use(json())
app.use(router)

dotenv.config()
const port = process.env["PORT"]!

const db = Database.getInstance()
db.connect().then(() => console.log('Connected to database'))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
