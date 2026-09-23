import type { Character } from "./types";

function TableHeader() {
  return (
    <thead className="bg-gray-300 border-t">
        <tr className="border-b border-l">
            <th className="border-r px-2 py-1">Name</th>
            <th className="border-r px-2 py-1">Job</th>
            <th className="border-r px-2 py-1">ID</th>
            <th className="border-r px-2 py-1"></th>
        </tr>
    </thead>
  );
}

function TableBody(props: { characterData: Character[], removeCharacter: (_id: string) => void }) {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index} className="border-b border-l">
                <td className="border-r px-2 py-1">{row.name}</td>
                <td className="border-r px-2 py-1">{row.job}</td>
                <td className="border-r px-2 py-1">{row._id}</td>
                <td className="border-r px-2 py-1">
                    <button className="text-red-400 hover:text-red-500 hover:underline cursor-pointer p-1 transition" onClick={() => props.removeCharacter(row._id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <tbody className="">
            {rows}
        </tbody>
    );
}

function Table(props: { characterData: Character[], removeCharacter: (_id: string) => void }) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
      </table>
    );
}

export default Table;