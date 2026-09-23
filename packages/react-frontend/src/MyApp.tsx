import { useEffect, useState } from "react";
import Table from "./Table";
import type { Character, NewCharacter } from "./types";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState<Character[]>([]);

    function removeOneCharacter(_id: string) {
        deleteUser(_id)
            .then(() => setCharacters(characters.filter(c => c._id != _id)))
            .catch(console.error)
    }

    function updateList(person: NewCharacter) {
        postUser(person)
            .then((res) => res.json())
            .then((person) => setCharacters([...characters, person]))
            .catch(console.error);
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person: NewCharacter) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function deleteUser(_id: string) {
        const promise = fetch(`Http://localhost:8000/users/${_id}`, {
            method: "DELETE",
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch(console.error);
    }, []);

    return (
        <div className="container mx-auto flex flex-col items-center p-8">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp;
