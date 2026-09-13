import {
    taskGetModule,
    taskPostModule,
    taskUpdateModule,
    taskDeleteModule
} from "../model/module.task.module.js";

interface BodyTaskService {
    description: string;
    categorie_id: string;
}


// GET TASK
export const getTaskService = async () => {
    const response = await taskGetModule();

    return response;
};


// CREATE TASK
export const createTaskService = async (
    body: BodyTaskService,
    userId: number
) => {
    const response = await taskPostModule(body, userId);

    return response;
};


// UPDATE TASK
export const updateTaskService = async (
    body: BodyTaskService,
    taskId: string | string[] | number
) => {
    const response = await taskUpdateModule(body, taskId);

    return response;
};


// DELETE TASK
export const deleteTaskService = async (
    taskId: any
) => {
    const response = await taskDeleteModule(taskId);

    return response;
};