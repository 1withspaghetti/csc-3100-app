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

app.get("/users/:id", (req, res) => {
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

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users.users_list.findIndex((user) => user.id == id);
    if (index == -1) return res.status(404).send({ message: "Not found" })
    users.users_list.splice(index, 1);
    res.send()
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});