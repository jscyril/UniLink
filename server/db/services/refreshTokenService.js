import jwt from "jsonwebtoken";

export default function generateRefreshToken(userData, refreshTokenSecret) {
  return jwt.sign(userData, refreshTokenSecret, { expiresIn: "1d" });
}
