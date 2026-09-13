import { Request, Response } from "express"
import { taskDeleteModule, taskGetModule, taskPostModule, taskUpdateModule } from "../model/module.task.module.js"
export const getTaskController = async (_: any, res: Response) => {
    try {
        const response = await taskGetModule();
        if (response.length === 0) {
            return res.status(403).json({
                status: false,
                message: "silahkan add tugas"
            });
        }
        return res.status(200).json({
            status: true,
            message: "success get task",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}
export const createTaskController = async (req: Request, res: Response) => {
    try {
        const id = req.users?.id;
        const body = req.body;
        console.log(body)
        const [data] = await taskPostModule(body, id);
        console.log(data)
        if (!data) {
            return res.status(403).json({
                status: false,
                message: "gagal create task"
            })
        }
        return res.status(201).json({
            status: true,
            message: "success create task",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const updateTakcontroller = async (req: Request, res: Response) => {
    try {
        let id : string | string[] = req.params?.id;
        const body = req.body
        const response = await taskUpdateModule(body, id);
        if (!response) {
            return res.status(403).json({
                status: false,
                message: "error update task"
            });
        }
        return res.status(200).json({
            status: true,
            message: "success update task",
            data : response
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        let idTask = req.params.id;
        const response = await taskDeleteModule(idTask)
        if (!response) {
            return res.status(403).json({
                status: false,
                message: "error delete task"
            });
        }
        return res.status(200).json({
            status: true,
            message: "success delete data",
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}