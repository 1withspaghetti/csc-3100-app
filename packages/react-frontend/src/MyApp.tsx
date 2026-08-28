import { useState } from "react";
import Table from "./Table";
import type { Character } from "./types";

const initialCharacters: Character[] = [
  {
    name: "Charlie",
    job: "Janitor",
  },
  {
    name: "Mac",
    job: "Bouncer",
  },
  {
    name: "Dee",
    job: "Aspring actress",
  },
  {
    name: "Dennis",
    job: "Bartender",
  },
];

function MyApp() {
    const [characters, setCharacters] = useState(initialCharacters);

    function removeOneCharacter(index: number) {
        const updated = characters.filter((_characters, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

  return (
    <div className="container mx-auto flex flex-col items-center p-8">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}
export default MyApp;
