import express from "express";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import { appConfig, connectDB } from "./config/index.js";
import cookieParser from "cookie-parser";
import { attachHelpers } from "./app/middlewares/helpers.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(session(sessionConfig.config));
// app.use(flash());
// app.use((req, res, next) => flashSession(req, res, next));

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

app.use(attachHelpers);

app.use(`${appConfig.apiPrefix}`, authRoutes);

app.use(`${appConfig.apiPrefix}`, postRoutes);

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
