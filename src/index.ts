/**
 * Required External Modules
 */
import * as dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { itemRouter } from "./items/items.router"
import { errorHandler } from "./middleware/error.middleware"
import { notFoundHandler } from "./middleware/not-found.middleware"

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
app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/api/menu/items", itemRouter)
app.use(errorHandler)
app.use(notFoundHandler)

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
