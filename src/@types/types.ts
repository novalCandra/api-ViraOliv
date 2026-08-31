import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    users: {
        id: number;
        name : string;
        email: string;
        password : string
    };
}
