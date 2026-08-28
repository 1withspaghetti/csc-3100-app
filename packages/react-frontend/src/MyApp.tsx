import { useState } from "react";
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
        setCharacters([...characters, person]);
    }

    return (
        <div className="container mx-auto flex flex-col items-center p-8">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp;
