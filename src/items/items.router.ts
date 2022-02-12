/**
 * Required External Modules and Interfaces
 */

import express, { NextFunction, Request, Response } from "express"
import * as ItemService from "./items.service"
import { BaseItem, Item } from "./item.interface"

import { checkJwt } from "../middleware/authz.middleware"

/**
 * Router Definition
 */

export const itemRouter = express.Router()

/**
 * Controller Definitions
 */

// GET items
itemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll()
    res.status(200).send(items)
  } catch(e: any) {
    res.status(500).send(e.message)
  } finally {
    res.end()
  }
})

// GET items/:id
itemRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    if (isNaN(id)) res.status(400).send("Bad Request.")
    const item: Item = await ItemService.find(id)
    if (item) {
      res.status(200).send(item)
    } else {
      res.status(404).send("Item Not Found.")
    }
  } catch(e: any) {
    res.status(500).send(e.message)
  } finally {
    res.end()
  }
})

// Mount authorization middleware
itemRouter.use(checkJwt)

// POST items
itemRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: validation
    const item: BaseItem = req.body

    const newItem = await ItemService.create(item)
    res.status(201).json(newItem)
  } catch(e: any) {
    res.status(500).send(e.message)
  }
})

// PUT items/:id
itemRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      res.status(400).send("Bad Request.")
    } else {
      const itemUpdate: Item = req.body
      const existingItem: Item = await ItemService.find(id)

      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate)
        return res.status(200).json(updatedItem)
      }

      const newItem = await ItemService.create(itemUpdate)
      res.status(201).json(newItem)
    }
  } catch(e: any) {
    res.status(500).send(e.message)
  }
})

// DELETE items/:id
itemRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    if (isNaN(id)) res.status(400).send("Bad Request.")
    await ItemService.remove(id)
    res.sendStatus(204)
  } catch(e: any) {
    res.status(500).send(e.message)
  }
})
