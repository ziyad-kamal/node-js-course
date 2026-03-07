import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.js";
import { returnError, returnSuccess } from "../utils/returnJson.js";
import RefreshToken from "../models/RefreshToken.js";

export const jwtVerify = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return returnError(res, "something went wrong", 500);
    }

    try {
        let user = null;
        if (accessToken) {
            user = jwt.verify(accessToken, appConfig.accessTokenSecret);
        } else {
            user = jwt.verify(refreshToken, appConfig.refreshTokenSecret);
        }
        req.user = user;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = RefreshToken.find({ token }).select(
                "refreshToken",
                "expiresAt",
            );

            if (token.expiresAt > Date.now()) {
                res.cookie("refreshToken", refreshToken.refreshToken, {
                    httpOnly: true, // ← very important (blocks JS access)
                    secure: appConfig.nodeEnv === "production", // true = only HTTPS (set false in dev)
                    sameSite: "strict", // or 'lax' — 'strict' is safer
                    maxAge: 15 * 60 * 1000, // match expiresIn
                    path: "/",
                });

                next();
            }

            return returnError(res, "token has expired", 401);
        }
        if (error.name === "JsonWebTokenError") {
            return returnError(res, "something went wrong", 500);
        }

        return returnError(res, "something went wrong", 500);
    }
};
