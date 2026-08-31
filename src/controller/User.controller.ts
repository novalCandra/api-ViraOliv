import { Response } from "express";
import { profileUpdateUsers, profileUsers } from "../model/ModuleUsers.module";
import { AuthenticatedRequest } from "../@types/types";
export const ProfileUsersController = async (req: AuthenticatedRequest, res: Response) => {
    const userProfile = req.users?.id
    try {
        if (!userProfile) {
            return res.status(402).json({
                status: false,
                message: "users not found database"
            })
        }
        const [data] = await profileUsers(userProfile)
        return res.status(200).json({
            status: true,
            message: "success GET users",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            messageError: error,
            message: "message internal server error api"
        })
    }
}

export const ProfileUpdateController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userProfile = req.users?.id!
        const { name, email } = req.body;
        await profileUpdateUsers(userProfile, { name, email })
        return res.status(201).json({
            status: true,
            message: "success update profile",
            data: {
                name,
                email,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            messageError: error,
            message: "message internal server error api"
        })
    }
}