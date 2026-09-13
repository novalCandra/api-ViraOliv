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

export const getTaskService = async () => {
    const response = await taskGetModule();

    return response;
};

export const createTaskService = async (
    body: BodyTaskService,
    userId: number
) => {
    const response = await taskPostModule(body, userId);

    return response;
};

export const updateTaskService = async (
    body: BodyTaskService,
    taskId: string | string[] | number
) => {
    const response = await taskUpdateModule(body, taskId);

    return response;
};

export const deleteTaskService = async (
    taskId: any
) => {
    const response = await taskDeleteModule(taskId);

    return response;
};