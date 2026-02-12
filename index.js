const express = require("express");
const mongoose = require("mongoose");

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

app.listen(3000);

app.get("/hello/:name", (req, res) => {
    res.render("index.ejs", { name: "ziyad" });
});
