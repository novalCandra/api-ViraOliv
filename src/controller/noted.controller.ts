import { Request, Response } from "express"
import { createModuleDataNotes, deleteModuleUsers, getModuleDataNotesDetails, getSearchDataNotes, updateModuleDataNotes } from "../model/ModuleNoted.module.js"
import QueryString from "qs";
import { getNotesService } from "../service/notes.service.js";

export const getNotedController = async (req: Request, res: Response) => {
    try {
        const id = req.users?.id;
        const data = await getNotesService(id);
        return res.status(200).json({
            status: true,
            message: "success menampilkan data noted",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}


export const getNotedDetails = async (req: Request, res: Response) => {
    try {
        const id : string | string[] = req.params.id;
        console.log(id)
        const dataDetails = await getModuleDataNotesDetails(id);
        return res.status(200).json({
            status : true,
            message : "success menenampilkan details data noted",
            data : dataDetails
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}

export const getNotedSearch = async (req: Request, res: Response) => {
    try {
        const { title }: QueryString.ParsedQs = req.query;
        const data = await getSearchDataNotes(title);
        return res.status(201).json({
            status: true,
            message: "sucess serach get data noted",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}


export const posrNotedController = async (req: Request, res: Response) => {
    try {
        const id = req.users.id
        const body = req.body;
        await createModuleDataNotes(body, id)
        return res.status(201).json({
            status: true,
            message: "success create noted",
            data: body
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}


export const updateNotedController = async (req: Request, res: Response) => {
    try {
        const idNoted = req.params.id
        const body = req.body;
        await updateModuleDataNotes(body, idNoted);
        return res.status(201).json({
            status: true,
            message: "success update data",
            data: body
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}
export const deleteNotedController = async (req: Request, res: Response) => {
    try {
        const idNoted = req.params.id
        await deleteModuleUsers(idNoted);
        return res.status(201).json({
            status: true,
            message: "success delete data",
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            error: error
        })
    }
}