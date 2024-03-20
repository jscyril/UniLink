import express from "express";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { homePageJSON } from "./dbSim.js";
import { profileInfo } from "./dbSim.js";
import { clubsList } from "./dbSim.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesFolderPath = join(__dirname, "../unilink/public");
dotenv.config();

app.use("/public", express.static(imagesFolderPath));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
});

function generateAccessToken(user) {
  return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
}

app.get("/", async (req, res) => {
  // Assuming the username is sent in the request body upon signing in
  const username = req.body.username;

  // If you need to fetch additional user details, you can use the username to query the database
  try {
    const userData = await prisma.users.findUnique({
      where: {
        username: username,
      },
      // You can select specific fields you need from the user table
      select: {
        userid: false,
        username: true,
        email: false,
        role: true,
        lastlogindate: false,
        registrationdate: true,
      },
    });
    // Send user data as response
    res.json(userData);
    res.json(homePageJSON);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.get("/profile", async (req, res) => {
  res.json(profileInfo);
});

app.get("/clubs", (req, res) => {
  res.json(clubsList);
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "User already exists" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: "user",
      },
    });

    res.status(201).send("Registration Successful");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred during registration" });
  }
});

const userData = null;

// app.post("/signin", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         username: username,
//       },
//     });
//     if (!user) {
//       return res.status(400).json({ error: "User not found!" });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (passwordMatch) {
//       const accessToken = generateAccessToken(user);
//       const refreshToken = jwt.sign(
//         user.username,
//         process.env.REFRESH_TOKEN_SECRET
//       );
//       res.json({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         username: user.username,
//       });
//     } else {
//       res.status(401).json({ error: "Incorrect Password!" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error occurred during signin");
//   }
// });

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(
        user.username,
        process.env.REFRESH_TOKEN_SECRET
      );
      // Here, you can send the username along with the access and refresh tokens
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: user.username,
      });

      // Now, let's create a Prisma query to retrieve user details and handle it in the "/" route
      const userData = await prisma.users.findUnique({
        where: {
          username: user.username,
        },
        // You can select specific fields you need from the user table
        select: {
          userid: true,
          username: true,
          email: true,
          role: true,
          lastlogindate: true,
          registrationdate: true,
        },
      });
      // Now you can use userData in your "/" route to display user details
      // You can also send userData as part of the response to the "/" route if needed
    } else {
      res.status(401).json({ error: "Incorrect Password!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred during signin");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
