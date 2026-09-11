import { useEffect, useState } from "react";
import Table from "./Table";
import type { Character } from "./types";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState<Character[]>([]);

    function removeOneCharacter(index: number) {
        const updated = characters.filter((_characters, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person: Character) {
        postUser(person)
            .then((res) => res.json())
            .then((person) => setCharacters([...characters, person]))
            .catch((error) => {
                console.log(error);
            });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person: Character) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container mx-auto flex flex-col items-center p-8">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp;
