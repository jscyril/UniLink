import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesFolderPath = join(__dirname, "../unilink/public");

app.use("/public", express.static(imagesFolderPath));

const port = 3000;

const homePageJSON = {
  clubs: [
    { id: 0, clubName: "SAMAGARA" },
    { id: 1, clubName: "ACC" },
    { id: 2, clubName: "SWO" },
  ],
  eventBar: {
    trending: ["Blossoms", "Passion Carols", "Darpan"],
  },
  post: [
    {
      id: 0,
      club: "SWO",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      heading: "Blossoms",
      username: "Jacob",
      timestamp: "2024-02-14T20:30:00Z",
      avatar: "/swo.jpg",
      img: "/blossoms.jpg",
    },
    {
      id: 1,
      club: "CUSBMA",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      heading: "Darpan",
      username: "Ayon",
      timestamp: "2024-02-14T08:30:00Z",
      avatar: "/cusbma.png",
      img: null,
    },
    {
      id: 2,
      club: "ACC",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      heading: "Passion Carols",
      username: "Joshua",
      timestamp: "2024-02-12T20:20:00Z",
      avatar: "/acc.jpg",
      img: "/passion-carols.jpg",
    },
    {
      id: 3,
      club: "OZARK Prod.",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      heading: "Theatre Play",
      username: "Nihal",
      timestamp: "2024-02-11T10:10:00Z",
      avatar: "/ozark.png",
      img: null,
    },
  ],
};

console.log(homePageJSON);

app.get("/", (req, res) => {
  res.send(homePageJSON);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
