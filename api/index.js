const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const maxSize = 1 * 1000 * 1000 * 1000;
const uploadMiddleware = multer({ limits: { fileSize: maxSize } });
let refresh = null;
app.use(
  cors({
    credentials: true,
    origin: "https://blog-application-fullstack.vercel.app",
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  `mongodb+srv://blog-owner:${process.env.DB_PASSWORD}@cluster0.dzqa4l9.mongodb.net/?retryWrites=true&w=majority`
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passCheck = bcrypt.compareSync(password, userDoc.password);
  if (passCheck) {
    jwt.sign(
      { username, id: userDoc._id },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        else
          res.cookie("token", token).json({
            id: userDoc._id,
            username,
            token,
          });
        refresh = token;
        console.log(refresh);
      }
    );
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/api/profile", (req, res, next) => {
  let { token } = req.cookies;
  if (token == undefined) {
    token = null;
  }

  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    if (err) {
      return next();
    }
    res.json(info);
    next();
  });
});

app.post("/api/logout", (req, res) => {
  const { userInfo } = req.body;
  refresh = null;
  res.cookie("token", "").json({ userInfo });
});

app.get("/api/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.post("/api/post", uploadMiddleware.single("file"), async (req, res) => {
  const { title, content, summary, file } = req.body;
  let { token } = req.cookies;
  if (!token) token = refresh;
  console.log(token);
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) throw err;
    else {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: file,
        author: info.id,
      });
      res.json({ postDoc });
    }
  });
});

app.put("/api/post", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  if (!token) token = refresh;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, content, summary, file } = req.body;
    const postDoc = await Post.findById(id);
    const check = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!check) {
      return res.status(400).json("You are not the author");
    }

    await Post.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: file,
    });
    res.json({ postDoc });
  });
});

app.get("/api/post/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Post.findById(id).populate("author", ["username"]));
});

app.delete("/api/delete/:postID", async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndDelete(postID);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/myposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const authorPosts = await Post.find({ author: id });
    if (!authorPosts) {
      return res
        .status(404)
        .json({ message: "No posts found for this author." });
    }
    res.json(authorPosts);
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log(`app listening on port ${process.env.PORT}`)
  );
}

module.exports = app;
