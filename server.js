const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// storage config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// ⚠️ upload yaha define karo
const upload = multer({ storage });

app.use(express.json());

// static folder
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// ✅ ONLY ONE upload route (title + desc wala)
app.post("/upload", upload.single("image"), (req, res) => {

    const data = {
        image: "/uploads/" + req.file.filename,
        title: req.body.title,
        desc: req.body.desc
    };

    let slides = [];

    if (fs.existsSync("slides.json")) {
        slides = JSON.parse(fs.readFileSync("slides.json"));
    }

    slides.push(data);

    fs.writeFileSync("slides.json", JSON.stringify(slides, null, 2));

    res.json({ success: true });
});

// get slides
app.get("/slides", (req, res) => {
    if (!fs.existsSync("slides.json")) return res.json([]);
    res.json(JSON.parse(fs.readFileSync("slides.json")));
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});