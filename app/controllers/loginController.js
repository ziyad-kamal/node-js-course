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

    const accessToken = jwt.sign(
        {
            user,
        },
        appConfig.accessTokenSecret,
        { expiresIn: "1m" },
    );

    const refreshToken = jwt.sign(
        {
            user,
        },
        appConfig.refreshTokenSecret,
        { expiresIn: "3m" },
    );

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // match expiresIn
    });

    return returnSuccess(res, "you login successfully", 200, { accessToken });
};

const welcome = async (req, res) => {
    return returnSuccess(res, "welcome", 200, {});
};

export { login, welcome };
