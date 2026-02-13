const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Posts");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/course");
        console.log("MongoDB connected successfully! ✓");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

connectDB();

const app = express();

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

app.listen(3000);

app.get("/hello/:name", (req, res) => {
    res.render("index.ejs", { name: "ziyad" });
});

app.post("/post/store", async (req, res) => {
    const newPost = new Post();
    const reqBody = req.body;

    newPost.title = reqBody.title;
    newPost.content = reqBody.content;
    await newPost.save();

    res.redirect("/hello/ziyad");
});
