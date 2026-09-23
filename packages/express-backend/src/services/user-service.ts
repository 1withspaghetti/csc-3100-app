import express from "express";
import { users } from "./users.ts";
import { nanoid } from "nanoid";

const router = express.Router();

router.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let results = users.users_list;
    if (name != undefined && typeof name == "string") {
        results = results.filter((user) => user["name"] === name)
    }
    if (job != undefined && typeof job == "string") {
        results = results.filter((user) => user["job"] === job)
    }
    res.send({ users_list: results });
});

const findUserById = (id: string) =>
    users["users_list"].find((user) => user["id"] === id);

router.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send({ message: "Resource not found." });
    } else {
        res.send(result);
    }
});

const addUser = (user: typeof users.users_list[0]) => {
    users["users_list"].push(user);
    return user;
};

router.post("/users", (req, res) => {
    const userToAdd = req.body;
    const user = {
        ...userToAdd,
        id: nanoid()
    }
    addUser(user);
    res.status(201).send(user);
});

router.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users.users_list.findIndex((user) => user.id == id);
    if (index == -1) return res.status(404).send({ message: "Not found" })
    users.users_list.splice(index, 1);
    res.send()
});

export default router;