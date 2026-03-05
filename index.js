import express from "express";
import userRoutes from "./routes/userRoutes.js";
import flash from "connect-flash";
import session from "express-session";
import errorHandler from "./app/middlewares/errorHandler.js";
import {
    appConfig,
    connectDB,
    sessionConfig,
    flashSession,
} from "./config/index.js";

connectDB();

const app = express();

app.use(express.json());
// app.use(session(sessionConfig.config));
// app.use(flash());
// app.use((req, res, next) => flashSession(req, res, next));

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

app.use(`${appConfig.apiPrefix}`, userRoutes);

app.use(errorHandler);

app.listen(appConfig.port);

// app.get("/post/:post_id", async (req, res) => {
//     const id = req.params.post_id;
//     const post = await Post.findById(id);

//     res.render("post.ejs", { post: post });
// });

// app.delete("/post/delete/:post_id", async (req, res) => {
//     const id = req.params.post_id;
//     await Post.findByIdAndDelete(id);

//     res.redirect("/hello/ziyad");
// });
