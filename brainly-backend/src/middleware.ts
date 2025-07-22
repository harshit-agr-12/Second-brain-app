import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response , NextFunction } from "express"
import { jwtSecret } from "./config"


export const userMiddleware  = (req : Request,res : Response ,next : NextFunction)=>{
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,jwtSecret);
    if(decoded){
        req.userId = (decoded as JwtPayload).id;
        next();
    } else {
        res.status(403).json({
            message : "you are not login"
        })
    }
}