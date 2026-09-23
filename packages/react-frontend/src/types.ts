export type NewCharacter = {
    name: string,
    job: string
}

export type Character = NewCharacter & {
    _id: string
}