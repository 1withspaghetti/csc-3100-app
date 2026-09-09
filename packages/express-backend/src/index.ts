import express from "express";
import { users } from "./users/users.ts";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const findUserByName = (name: string) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined && typeof name == "string") {
        let result = findUserByName(name);
        res.send({ users_list: result });
    } else {
        res.send(users);
    }
});

const findUserById = (id: string) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send({ message: "Resource not found." });
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});