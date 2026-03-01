import "dotenv/config";

export const appConfig = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    apiPrefix: "/api",
    // jwtSecret: process.env.JWT_SECRET || "super-secret-dev-key-change-me",
    // frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
