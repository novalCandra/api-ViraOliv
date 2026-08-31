import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { publicKeys } from "../private/jwt/jwt";
declare global{
    namespace Express{
        interface Request {
            users? : any
        }
    }
}
const VerifyToken = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const authorization = req.headers?.authorization;
        if (!authorization) {
            return res.status(405).json({
                status: false,
                message: "please Sign-in / Sign up"
            })
        }

        if (!authorization.startsWith("JWT ")) {
            return res.status(402).json({
                status: false,
                message: "Authorization format must to JWT : <BearerToken>"
            })
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, publicKeys, { algorithms: ["PS256"] })
        req.users= decoded
        next();
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export default VerifyToken