const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
