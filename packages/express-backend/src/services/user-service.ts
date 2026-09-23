import express from "express";
import { User, type IUser } from "../models/user.ts";

const router = express.Router();

router.get("/", async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let query: Partial<IUser> = {};
    if (name != undefined && typeof name == "string") {
        query.name = name;
    }
    if (job != undefined && typeof job == "string") {
        query.job = job;
    }

    const users = await User.find(query)
    res.send({ users_list: users.map(u => u.toObject()) });
});

router.get("/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id

    const user = await User.findById(id);
    if (user === null) {
        res.status(404).send({ message: "Resource not found." });
    } else {
        res.send(user.toObject());
    }
});

router.post("/", async (req, res) => {
    const user = await new User(req.body).save();
    res.status(201).send(user.toObject());
});

router.delete("/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await User.findByIdAndDelete(id);
    if (result == null) return res.status(404).send({ message: "Not found" });
    res.send()
});

export default router;