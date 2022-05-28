//const express = require("express");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// some route controllers
const cors = require("cors");

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const filetStoreageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./file");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: filetStoreageEngine });

// app.post("/data", upload.single("files"), (req, res, next) => {
//   console.log(req.file);
//   res.send("single file uploads");
// });

app.post("/multiple", upload.array("Mfiles", 2), (req, res, next) => {
  res.send("multi file success");
});
app.get("/read", (req, res, next) => {});
app.use("/DataFile", require("./Router"));
app.listen(5200, () => {
  console.log("port started on 5200");
});
