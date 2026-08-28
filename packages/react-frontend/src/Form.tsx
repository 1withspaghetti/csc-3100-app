import { useState, type ChangeEvent } from "react";
import type { Character } from "./types";

function Form(props: { handleSubmit: (character: Character) => void }) {
    const [person, setPerson] = useState<Character>({
        name: "",
        job: "",
    });

    // This is horribly written code, and should not be taught to us lol
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === "job") setPerson({ name: person["name"], job: value });
        else setPerson({ name: value, job: person["job"] });
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
    }

    return <form className="flex flex-col mt-8">
        <label htmlFor="name" className="text-sm mb-1">Name:</label>
        <input
            type="text"
            name="name"
            id="name"
            value={person.name}
            onChange={handleChange}
            className="mb-2 outline"
        />
        <label htmlFor="job" className="text-sm mb-1">Job:</label>
        <input
            type="text"
            name="job"
            id="job"
            value={person.job}
            onChange={handleChange}
            className="mb-2 outline"
        />
        <input type="button" value="Submit" onClick={submitForm} className="mx-auto px-4 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" />
    </form>
}
export default Form;
