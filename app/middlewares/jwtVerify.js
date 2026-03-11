import jwt from "jsonwebtoken";
import { returnError } from "../utils/returnJson.js";
import { jwtConfig } from "../../config/jwt.js";

export const jwtVerify = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return returnError(res, "token not found", 401);
    }

    try {
        const user = jwt.verify(accessToken, jwtConfig.accessTokenSecret);
        req.user = user;

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            if (!refreshToken) {
                return returnError(
                    res,
                    "Session expired, please login again",
                    401,
                );
            }

            try {
                const userData = jwt.verify(
                    refreshToken,
                    jwtConfig.refreshTokenSecret,
                );

                const newAccessToken = jwt.sign(
                    { _id: userData._id, email: userData.email },
                    jwtConfig.accessTokenSecret,
                    { expiresIn: jwtConfig.accessExpireTime },
                );

                res.cookieHelper(
                    "accessToken",
                    newAccessToken,
                    2 * 24 * 60 * 60 * 1000,
                );

                req.user = userData;
                return next();
                // eslint-disable-next-line no-unused-vars
            } catch (refreshError) {
                return returnError(
                    res,
                    "Session expired, please login again",
                    401,
                );
            }
        }

        if (error.name === "JsonWebTokenError") {
            return returnError(res, "Invalid token", 401);
        }

        return returnError(res, "Something went wrong", 500);
    }
};
