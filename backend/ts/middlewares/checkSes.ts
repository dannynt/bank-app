import { Request, Response, NextFunction } from "express";
import { GetUserFromId } from "../Commands";

export const checkSes = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        res.status(400).send("Access Denied");
        return;
    } else {
        req.body.user = await GetUserFromId(req, res);
        next();
    }
    //Call the next middleware or controller
};