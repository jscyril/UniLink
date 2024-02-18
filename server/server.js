import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { homePageJSON } from "./home.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesFolderPath = join(__dirname, "../unilink/public");

app.use("/public", express.static(imagesFolderPath));

const port = 3000;

console.log(homePageJSON);

app.get("/", (req, res) => {
  res.json(homePageJSON);
  // res.send("This is home page json");
});

app.get("/post", (req, res) => {
  res.send("This is post page");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
