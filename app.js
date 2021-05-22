const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
module.exports = app;
