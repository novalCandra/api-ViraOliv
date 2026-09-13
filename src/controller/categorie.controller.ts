import { Request, Response } from "express"
import { getModuleDataCategories } from "../model/module.categorie.module.js"
export const getDataCategoriesUses = async(req : Request, res : Response) => {
    try {
        const data = await getModuleDataCategories()
        if(data.length === 0){
            return res.status(403).json({
                status : false,
                message : "tambahkan categories"
            })
        }
        return res.status(200).json({
            status : true,
            message : "success get data categories",
            data : data
        })
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error
        })
    }
}