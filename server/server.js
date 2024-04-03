import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
// import { refreshHandler } from "./routes/refresh";
// import { homeHandler } from "./routes/home";

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesFolderPath = join(__dirname, "../unilink/public");
let userData = {};
app.use(cookieParser());
dotenv.config();

app.use("/public", express.static(imagesFolderPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust this according to your needs
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials
  })
);
// Cross Origin Resource Sharing
// const whitelist = [
//   "https://www.yoursite.com",
//   "http://127.0.0.1:3000",
//   "http://localhost:5173/",
//   "http://127.0.0.1:5173",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.get("/refresh", async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;

  const foundUser = await prisma.users.findUnique({
    where: {
      userid: userData.userId,
    },
    select: {
      username: true,
    },
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err || foundUser.username !== decoded.username) {
      console.error(err);
      return res.sendStatus(403).send("error occured");
    }
    const accessToken = jwt.sign(
      { user: decoded },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    res.json({ accessToken });
  });
});

// app.get("/refresh", refreshHandler);

function generateAccessToken(user) {
  return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
}

// app.get("/", homeHandler);

app.get("/", async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: {
          select: { username: true }, // Select only username from users table
        },
        clubs: {
          select: { clubname: true, clublogo: true }, // Select only clubname from clubs table
        },
      },
      orderBy: { postid: "asc" },
    });
    // Transform the data to remove unwanted fields
    const transformedPosts = posts.map((post) => ({
      postid: post.postid,
      title: post.title,
      description: post.description,
      timestamp: post.timestamp,
      likes: post.likes,
      imagepath: post.imagepath ? post.imagepath : null,
      username: post.users ? post.users.username : null, // Retrieve username from related user
      club: post.clubs
        ? { clubname: post.clubs.clubname, clublogo: post.clubs.clublogo }
        : null,
    }));

    const userClubs = await prisma.clubmembers.findMany({
      where: {
        userid: userData.userId,
      },
      include: {
        clubs: {
          select: {
            clubid: true,
            clubname: true,
          },
        },
      },
      orderBy: {
        clubs: {
          clubname: "asc",
        },
      },
    });
    const events = await prisma.posts.findMany({
      select: {
        title: true,
        likes: true,
        postid: true,
      },
      orderBy: {
        likes: "desc",
      },
    });
    const clubs = userClubs.map((clubs) => ({
      clubid: clubs.clubid,
      clubname: clubs.clubs ? clubs.clubs.clubname : null,
    }));
    res.json({
      username: userData.username,
      clubs: clubs,
      post: transformedPosts,
      events: events,
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
});

app.get("/clubs", async (req, res) => {
  const clubs = await prisma.clubs.findMany({
    select: {
      clubid: true,
      clubname: true,
      clubdesc: true,
      clublogo: true,
    },
  });
  res.json(clubs);
});

app.get("/profile", async (req, res) => {
  const result = await prisma.users.findUnique({
    where: {
      userid: userData.userId,
    },
    select: {
      username: true,
      registrationdate: true,
      role: true,
      clubmembers: {
        select: {
          clubs: {
            select: {
              clubname: true,
              clubid: true,
            },
          },
        },
      },
    },
  });

  const user = {
    user: {
      username: result.username,
      registrationdate: result.registrationdate,
      role: result.role,
      clubs: result.clubmembers.map((clubs) => ({
        clubname: clubs.clubs.clubname,
        clubid: clubs.clubs.clubid,
      })),
    },
  };
  // res.send(result);
  res.json(user);
});

app.get("/clubs", async (req, res) => {
  const result = await prisma.clubs.findMany({
    select: {
      clubid: true,
      clubname: true,
      clublogo: true,
      postcount: true,
    },
    orderBy: {
      clubname: "asc",
    },
  });
  res.json({ clubArr: result });
});

app.get("/post/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.posts.findUnique({
      where: {
        postid: id,
      },
      include: {
        users: {
          select: { username: true }, // Select only username from users table
        },
        clubs: {
          select: { clubname: true, clublogo: true, clubid: true, clubdesc: true }, // Select only clubname from clubs table
        },
      },
    });

    const members = await prisma.clubmembers.findMany({
      where:{
        clubid: id,
      },
    });

    const data = {
      postid: post.postid,
      title: post.title,
      description: post.description,
      timestamp: post.timestamp,
      likes: post.likes,
      imagepath: post.imagepath ? post.imagepath : null,
      username: post.users.username,
      club:{ clubname: post.clubs.clubname, clublogo: post.clubs.clublogo, clubid: post.clubs.clubid, members: members.length, clubdesc: post.clubs.clubdesc}
    };
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error("Error fetching data: try is not woeking", err);
  }
});

app.get("/club/:id", async (req, res) => {
  const clubid = parseInt(req.params.id);
  const clubResult = await prisma.clubs.findUnique({
    where: {
      clubid: clubid,
    },
  });
  const members = await prisma.clubmembers.findMany({
    where:{
      clubid: clubid,
    },
  });
  const result = await prisma.posts.findMany({
    where: {
      clubid: clubid,
    },
    include: {
      users: {
        select: { username: true }, // Select only username from users table
      },
      clubs: {
        select: { clubname: true, clublogo: true, clubid: true }, // Select only clubname from clubs table
      },
    },
    orderBy: {
      postid: "asc",
    },
  });

  const posts = result.map((post) => ({
    postid: post.postid,
    title: post.title,
    description: post.description,
    timestamp: post.timestamp,
    likes: post.likes,
    imagepath: post.imagepath ? post.imagepath : null,
    user: post.users ? post.users.username : null,
    club: post.clubs
      ? { clubname: post.clubs.clubname, clublogo: post.clubs.clublogo, clubid: post.clubs.clubid}
      : null,
  }));

  const data = {
    ...clubResult,
    members: members.length
  }
  console.log({post: posts, club: data});
  res.json({ post: posts, club: data });
});

app.post("/follow", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userid = data.userid;
  const clubid = data.clubid;
  const userclub = await prisma.clubmembers.findUnique({
    where: {
      userid_clubid : {userid, clubid}
    },
    select: {
      userclubid: true,
      userid: true,
      clubid: true,
    },
  });
  console.log(userclub);
  if (userclub) {
    res.json({ value: true , userclub:userclub});
  } else {
    res.json({ value: false });
  }
});

app.post("/clubmember", async (req, res) => {
  const data = req.body;

  const adduser = await prisma.clubmembers.create({
    data: {
      userid: data.userid,
      clubid: data.clubid,
    },
  });
  if (adduser) {
    res.status(200);
  } else {
    res.status(400);
  }
});

app.post("/clubmemberdelete", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userid= data.userid;
  const clubid = data.clubid;
  const userclubid = data.userclubid;
  console.log(userclubid,userid,clubid);
  const deleteUserClub = await prisma.clubmembers.delete({
    where: {
      userclubid: userclubid
    },
  });
  if (deleteUserClub) {
    res.send("deleted");
  } else {
    res.send("error not deleted line 318 server.js");
  }
});
app.post("/signup", async (req, res) => {
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
    req.session.user = {
      username: newUser.username,
      userId: newUser.userid,
      role: newUser.role,
    };

    userData = req.session.user;
    const accessToken = generateAccessToken(userData);
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 10000,
      sameSite: false,
    });
    res.json({
      accessToken: accessToken,
      user: userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred during registration" });
  }
});

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
      req.session.user = {
        username: user.username,
        userId: user.userid,
        role: user.role,
      };
      userData = req.session.user;
      const accessToken = generateAccessToken(userData);
      const refreshToken = jwt.sign(
        userData,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000,
        maxAge: 10000,
        sameSite: false,
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

app.get("/clubmoderation", async (req, res) => {
  try {
    const clublist = await prisma.clubs.findMany();
    // console.log(clublist);
    res.json(clublist);
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", (req, res) => {
  // Destroy session to log user out
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Session deleted successfully.");
    }
  });
  res.json({ message: "Logged out successfully" });
});

app.delete("/clubmoderation", async (req, res) => {
  const id = req.body;
  try {
    const deleteClub = await prisma.clubs.delete({
      where: {
        clubid: id.clubid,
      },
    });
    res.send("deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addpost", async (req, res) => {
  const postData = req.body;
});

app.get("/editprofile/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userdata = await prisma.users.findUnique({
    where: {
      userid: id,
    },
    select: {
      username: true,
      email: true,
    },
  });

  res.json(userdata);
});

app.get("/clubcreateupdate/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const modList = await prisma.moderators.findMany({
    where: {
      clubid: id,
    },
    select: {
      moderatorid: true,
      userid: true,
    },
  });

  if (modList) {
    res.json(modList);
  } else {
    res.send("mod list can not be sent");
  }
});

app.post("/clubcreateupdate", async (req, res) => {
  const data = req.body;

  const createClub = await prisma.clubs.create({
    data: {
      clubname: data.clubname,
      clubdesc: data.description,
      clublogo: data.clublogo,
    },
  });
  if (createClub) {
    res.send("club created");
  }
});

app.get("/clubmoderator/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.users.findUnique({
    where: {
      userid: id,
    },
    select: {
      username: true,
      userid: true,
      email: true,
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(400);
  }
});



app.patch("/editprofile", async (req, res) => {
  const userdata = req.body;
  if (!userdata.newpassword && !userdata.oldpassword) {
    const updateUser = await prisma.users.update({
      where: {
        userid: userdata.userid,
      },
      data: {
        username: userdata.username,
        email: userdata.email,
      },
    });
  } else {
    const user = await prisma.users.findUnique({
      where: {
        userid: userdata.userid,
      },
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        userdata.oldpassword,
        user.password
      );
      if (passwordMatch) {
        const hashedPassword = await bcrypt.hash(userdata.newpassword, 10);
        const updateUser = await prisma.users.update({
          where: {
            userid: userdata.userid,
          },
          data: {
            username: userdata.username,
            email: userdata.email,
            password: hashedPassword,
          },
        });
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
