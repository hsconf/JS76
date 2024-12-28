import express from "express";
import db from "../db";

export const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    res.status(200).send(await db.getAll());
})

messagesRouter.post("/", async (req: express.Request, res: express.Response) => {

    if (!req.body.message || !req.body.author) {
        res.status(400).send({"error": "Missing required fields"});
    }
    await db.init()
    await db.add(req.body)

    res.status(200).send(req.body);
})