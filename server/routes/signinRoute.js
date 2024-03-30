import express from "express";
import bcrypt from "bcrypt";
import generateRefreshToken from "../db/services/refreshTokenService.js";
import saveRefreshToken from "../db/models/refreshToken.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express.Router();
let userData = { username: "", userId: "", role: "" };

function generateAccessToken(user) {
  return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
}

router.post("/signin", async (req, res) => {
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
      userData.username = user.username;
      userData.userId = user.userid;
      userData.role = user.role;
      const refreshToken = generateRefreshToken(
        userData,
        process.env.REFRESH_TOKEN_SECRET
      );
      await saveRefreshToken(user.id, refreshToken);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        accessToken: accessToken,
        user: userData,
      });
    } else {
      res.status(401).json({ error: "Incorrect Password!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred during signin");
  }
});

export default router;
