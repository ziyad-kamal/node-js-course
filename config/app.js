import "dotenv/config";

export const appConfig = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    apiPrefix: "/api",
    accessTokenSecret: process.env.ACCESS_tOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_tOKEN_SECRET,

    // frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
