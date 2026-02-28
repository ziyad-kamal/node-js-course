import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import flash from "connect-flash";
import session from "express-session";
import errorHandler from "./app/middlewares/errorHandler.js";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/course");
        console.log("MongoDB connected successfully! ✓");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

mongoose.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

connectDB();

const app = express();

app.use(
    session({
        secret: "ziyad1995",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        },
    }),
);
app.use(flash());

app.use((req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const old = req.flash("old")[0] || {};
    const error = req.flash("error") || [];
    const success = req.flash("success") || [];

    res.locals.messages = {
        errors,
        old,
        error,
        success,
    };

    next();
});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(3000);

// app.get("/hello/:name", (req, res) => {
//     res.render("index.ejs", { name: "ziyad" });
// });

// app.get("/posts", async (req, res) => {});

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

// app.post("/post/store", async (req, res) => {
//     const newPost = new Post();
//     const reqBody = req.body;

//     newPost.title = reqBody.title;
//     newPost.content = reqBody.content;
//     await newPost.save();

//     res.redirect("/hello/ziyad");
// });
