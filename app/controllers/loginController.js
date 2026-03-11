import User from "../models/User.js";
import { returnError, returnSuccess } from "../utils/returnJson.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return returnError(res, "password or email is incorrect", 404);
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
        return returnError(res, "password or email is incorrect", 404);
    }

    const userData = { _id: user._id, email: user.email };

    const accessToken = jwt.sign(userData, jwtConfig.accessTokenSecret, {
        expiresIn: jwtConfig.accessExpireTime,
    });

    const refreshToken = jwt.sign(userData, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshExpireTime,
    });

    res.cookieHelper("accessToken", accessToken, 2 * 24 * 60 * 60 * 1000);
    res.cookieHelper("refreshToken", refreshToken, 2 * 24 * 60 * 60 * 1000);

    return returnSuccess(res, "you login successfully", 200);
};

const welcome = async (req, res) => {
    return returnSuccess(res, "welcome", 200, {});
};

export { login, welcome };
