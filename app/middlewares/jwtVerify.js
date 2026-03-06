import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.js";
import { returnError } from "../utils/returnJson.js";

export const jwtVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return returnError(res, "something went wrong", 500);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return returnError(res, "something went wrong", 500);
    }

    try {
        jwt.verify(token, appConfig.jwtSecret);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return returnError(res, "token has expired", 401);
        }
        if (error.name === "JsonWebTokenError") {
            return returnError(res, "something went wrong", 500);
        }

        return returnError(res, "something went wrong", 500);
    }
};
