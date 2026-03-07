import { appConfig } from "../../config/app.js";
import User from "../models/User.js";
import { returnSuccess } from "../utils/returnJson.js";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res
            .status(404)
            .json({ error: "password or email is incorrect" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res
            .status(401)
            .json({ error: "password or email is incorrect" });
    }

    const userData = { _id: user._id, email: user.email };

    const accessToken = jwt.sign(userData, appConfig.accessTokenSecret, {
        expiresIn: "1m",
    });

    const refreshToken = jwt.sign(userData, appConfig.refreshTokenSecret, {
        expiresIn: "3m",
    });

    await RefreshToken.create({
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // match expiresIn
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true, // ← very important (blocks JS access)
        secure: appConfig.nodeEnv === "production", // true = only HTTPS (set false in dev)
        sameSite: "strict", // or 'lax' — 'strict' is safer
        maxAge: 15 * 60 * 1000, // match expiresIn
        path: "/",
    });

    return returnSuccess(res, "you login successfully", 200);
};

const welcome = async (req, res) => {
    return returnSuccess(res, "welcome", 200, {});
};

export { login, welcome };
