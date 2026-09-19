import { getModuleDataNotes } from "../model/ModuleNoted.module.js"
export const getNotesService = async (id: number) => {
    const data = await getModuleDataNotes(id);
    if (data.length === 0) {
        throw new Error("it's not data Module")
    }
    return data
}