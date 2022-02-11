/**
 * Required External Modules
 */
import * as dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import { itemRouter } from "./items/items.router"

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1)
} else {
  console.log('port: %d', process.env.PORT)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

/**
 *  App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/api/menu/items", itemRouter)
app.use((req: Request, res: Response) => {
  res.status(404).send("NOT FOUND.")
})
// app.use(errorHandler)

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
