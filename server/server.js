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
import supabase from "@supabase/supabase-js";
import multer from "multer";
import fs from "fs";
// import { refreshHandler } from "./routes/refresh";
// import { homeHandler } from "./routes/home";

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesFolderPath = join(__dirname, "../unilink/public");
// const upload = multer({ dest: "uploads/" });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

const supabaseClient = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

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
    // console.log(decoded);
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
      orderBy: { postid: "desc" },
    });
    // Transform the data to remove unwanted fields
    const transformedPosts = posts.map((post) => ({
      postid: post.postid,
      title: post.title,
      description: post.description,
      timestamp: post.timestamp,
      postlikes: post.postlikes,
      imagepath: post.imagepath ? post.imagepath : null,
      user: post.users ? post.users.username : null, // Retrieve username from related user
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
      take: 5,
    });
    const events = await prisma.posts.findMany({
      select: {
        title: true,
        postlikes: true,
        postid: true,
      },
      orderBy: {
        postlikes: "desc",
      },
      take: 5,
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

app.get("/analytics", async (req, res) => {
  try {
    const signins = await prisma.analytics.findMany({
      where: {
        eventType: "signin",
      },
      include: {
        users: {
          select: {
            username: true,
            userid: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const signups = await prisma.analytics.findMany({
      where: {
        eventType: "signup",
      },
      include: {
        users: {
          select: {
            username: true,
            userid: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const addposts = await prisma.analytics.findMany({
      where: {
        eventType: "add-post",
      },
      include: {
        posts: {
          select: {
            title: true,
            postid: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const createClubs = await prisma.analytics.findMany({
      where: {
        eventType: "create-club",
      },
      include: {
        clubs: {
          select: {
            clubname: true,
            clubid: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const tableData = {
      signInTable: signins,
      signUpTable: signups,
      addPostTable: addposts,
      createClubTable: createClubs,
    };

    console.log(tableData.signInTable.length);
    res.json(tableData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      users: {
        select: {
          username: true,
        },
      },
    },
  });

  if (modList) {
    console.log(modList);
    res.json(modList);
  } else {
    res.send("mod list can not be sent");
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

app.get("/clubmoderation", async (req, res) => {
  try {
    const clublist = await prisma.clubs.findMany();
    // console.log(clublist);
    res.json(clublist);
  } catch (error) {
    console.error(error);
  }
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
          select: {
            clubname: true,
            clublogo: true,
            clubid: true,
            clubdesc: true,
          }, // Select only clubname from clubs table
        },
      },
    });

    const members = await prisma.clubmembers.findMany({
      where: {
        clubid: post.clubs.clubid,
      },
    });

    const data = {
      postid: post.postid,
      title: post.title,
      description: post.description,
      timestamp: post.timestamp,
      postlikes: post.postlikes,
      members: members.length,
      imagepath: post.imagepath ? post.imagepath : null,
      user: post.users ? post.users.username : null,
      club: {
        clubname: post.clubs.clubname,
        clublogo: post.clubs.clublogo,
        clubid: post.clubs.clubid,
        members: members.length,
        clubdesc: post.clubs.clubdesc,
      },
    };
    res.json(data);
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
    where: {
      clubid: clubid,
    },
  });
  const result = await prisma.posts.findMany({
    where: {
      clubid: clubid,
    },
    include: {
      users: {
        select: { username: true, userid: true }, // Select only username from users table
      },
      clubs: {
        select: { clubname: true, clublogo: true, clubid: true }, // Select only clubname from clubs table
      },
    },
    orderBy: {
      postid: "desc",
    },
  });

  const posts = result.map((post) => ({
    postid: post.postid,
    title: post.title,
    description: post.description,
    timestamp: post.timestamp,
    postlikes: post.postlikes,
    imagepath: post.imagepath ? post.imagepath : null,
    user: post.users ? post.users.username : null,
    userid: post.users.userid,
    club: post.clubs
      ? {
          clubname: post.clubs.clubname,
          clublogo: post.clubs.clublogo,
          clubid: post.clubs.clubid,
        }
      : null,
  }));
  const data = {
    ...clubResult,
    members: members.length,
  };
  // console.log({post: posts, club: data});
  res.json({ post: posts, club: data });
});

app.post("/follow", async (req, res) => {
  try {
    const data = req.body;
    const userid = data.userid;
    const clubid = req.body.clubid;
    const userclub = await prisma.clubmembers.findUnique({
      where: {
        userid_clubid: { userid, clubid },
      },
      select: {
        userclubid: true,
        userid: true,
        clubid: true,
      },
    });

    if (userclub) {
      res.json({ value: true, userclub: userclub });
    } else {
      res.json({ value: false });
    }
  } catch (error) {
    console.error("Error fetching club membership:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/isliked", async (req, res) => {
  try {
    const { userid, postid } = req.body;
    const checkLike = await prisma.likes.findUnique({
      where: {
        userid_postid: { userid, postid },
      },
    });
    if (checkLike !== null) {
      res.json({ value: true });
    } else {
      res.json({ value: false });
    }
  } catch (error) {
    console.error("Error checking like:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/likepost", async (req, res) => {
  const { userid, postid } = req.body;

  try {
    const like = await prisma.likes.create({
      data: {
        userid: userid,
        postid: postid,
      },
    });

    if (like) {
      await prisma.posts.update({
        where: {
          postid: postid,
        },
        data: {
          postlikes: {
            increment: 1,
          },
        },
      });
      await prisma.analytics.create({
        data: {
          eventType: "like-post",
          userid: userid,
          postid: postid,
        },
      });
      res.json({ value: true });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
});

app.post("/unlikepost", async (req, res) => {
  const { userid, postid } = req.body;

  try {
    const like = await prisma.likes.delete({
      where: {
        userid_postid: { userid, postid },
      },
    });

    if (like) {
      await prisma.posts.update({
        where: {
          postid: postid,
        },
        data: {
          postlikes: {
            decrement: 1,
          },
        },
      });

      await prisma.analytics.create({
        data: {
          eventType: "unlike-post",
          userid: userid,
          postid: postid,
        },
      });
      res.json({ value: false });
    }
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: "Failed to unlike post" });
  }
});

app.post("/clubmember", async (req, res) => {
  try {
    const data = req.body;
    const adduser = await prisma.clubmembers.create({
      data: {
        userid: data.userid,
        clubid: data.clubid,
      },
    });

    if (adduser) {
      await prisma.analytics.create({
        data: {
          eventType: "add-clubmember",
          userid: data.userid,
          clubid: data.clubid,
        },
      });

      res.status(200).json({ message: "User added to the club successfully" });
    } else {
      res.status(400).json({ message: "Failed to add user to the club" });
    }
  } catch (error) {
    console.error("Error adding user to the club:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/postdelete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Deleting the post
    const deletePost = await prisma.posts.delete({
      where: {
        postid: id,
      },
    });

    // Analytics code for tracking post deletion
    // await prisma.analytics.create({
    //   data: {
    //     eventType: "delete-post",
    //     postid: id,
    //   },
    // });

    if (deletePost) {
      res.send("post deleted");
    } else {
      res.send("could not delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/clubmemberdelete", async (req, res) => {
  try {
    const data = req.body;
    const userclubid = data.userclubid;
    const userid = data.userid;
    const clubid = data.clubid;

    // Deleting the club member
    const deleteUserClub = await prisma.clubmembers.delete({
      where: {
        userclubid: userclubid,
      },
    });

    // Analytics code for tracking club member deletion
    await prisma.analytics.create({
      data: {
        eventType: "delete-clubmember",
        userid: userid,
        clubid: clubid,
      },
    });

    if (deleteUserClub) {
      res.send("deleted");
    } else {
      res.send("error not deleted");
    }
  } catch (error) {
    console.error("Error deleting club member:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/isMod/:id", async (req, res) => {
  try {
    const clubid = parseInt(req.params.id);
    const userid = req.body.userid;
    const ismod = await prisma.moderators.findUnique({
      where: {
        userid_clubid: { userid, clubid },
      },
    });

    if (ismod) {
      res.json({ value: true });
    } else {
      res.json({ value: false });
    }
  } catch (error) {
    console.error("Error checking moderator:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
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

    await prisma.analytics.create({
      data: {
        eventType: "signup",
        userid: newUser.userid,
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
    console.error(err);
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
      await prisma.analytics.create({
        data: {
          eventType: "signin",
          userid: user.userid,
        },
      });

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

app.post("/logout", (req, res) => {
  // Destroy session to log user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Session deleted successfully.");
    }
  });
  res.json({ message: "Logged out successfully" });
});

app.post("/clubmoderation", async (req, res) => {
  const id = req.body.clubid;
  console.log(id);
  try {
    const clubMembers = await prisma.clubmembers.findMany({
      where: {
        clubid: id,
      },
    });
    if (clubMembers.length > 0) {
      // Delete club members
      const deleteMembers = await prisma.clubmembers.deleteMany({
        where: {
          clubid: id,
        },
      });

      const deleteMods = await prisma.moderators.deleteMany({
        where: {
          clubid: id,
        },
      });
    }
    const deleteClub = await prisma.clubs.delete({
      where: {
        clubid: id,
      },
    });
    console.log("Club and its members deleted successfully");

    await prisma.analytics.create({
      data: {
        eventType: "delete-club",
        clubid: id,
      },
    });
    res.status(200).send("Club deleted successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/addpost", upload.single("image"), async (req, res) => {
  const postData = req.body;
  console.log("\n\nLOGGING REQ.FILE\n\n", req.file);
  console.log("\n\nLOGGING REQ.BODY\n\n", postData);

  try {
    if (req.file) {
      const { data, error } = await supabaseClient.storage
        .from("post-images")
        .upload(`images/${req.file.originalname}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Error uploading image to Supabase" });
      }
      console.log(data);

      const imageurl = supabaseClient.storage
        .from("post-images")
        .getPublicUrl(data.path);

      const post = await prisma.posts.create({
        data: {
          clubid: parseInt(postData.clubid),
          userid: parseInt(postData.userid),
          title: postData.title,
          description: postData.description,
          imagepath: imageurl.data.publicUrl,
        },
      });

      await prisma.analytics.create({
        data: {
          eventType: "add-post",
          userid: parseInt(postData.userid),
          clubid: parseInt(postData.clubid),
          postid: post.postid,
        },
      });

      if (post) {
        res.json({ message: "Post added successfully" });
      } else {
        res.send("could not add post");
      }
    } else {
      const post = await prisma.posts.create({
        data: {
          clubid: parseInt(postData.clubid),
          userid: parseInt(postData.userid),
          title: postData.title,
          description: postData.description,
        },
      });

      await prisma.analytics.create({
        data: {
          eventType: "add-post",
          userid: parseInt(postData.userid),
          clubid: parseInt(postData.clubid),
          postid: post.postid,
        },
      });

      if (post) {
        res.json({ message: "Post added successfully" });
      } else {
        res.send("could not add post");
      }
    }
  } catch (err) {
    console.error("Error adding post:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.patch("/editpost/:id", upload.single("image"), async (req, res) => {
  const postData = req.body;
  const id = parseInt(req.params.id);
  try {
    let post = null;
    if (req.file) {
      const { data, error } = await supabaseClient.storage
        .from("post-images")
        .upload(`images/${req.file.originalname}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Error uploading image to Supabase" });
      }
      const imageurl = supabaseClient.storage
        .from("post-images")
        .getPublicUrl(data.path);

      post = await prisma.posts.update({
        where: {
          postid: id,
        },
        data: {
          clubid: parseInt(postData.clubid),
          userid: parseInt(postData.userid),
          title: postData.title,
          description: postData.description,
          imagepath: imageurl.data.publicUrl,
        },
      });

      if (post) {
        res.json({
          message: "Post added successfully",
          fileURL: data.fullPath,
        });
      } else {
        res.send("could not add post");
      }
    } else {
      post = await prisma.posts.update({
        where: {
          postid: id,
        },
        data: {
          clubid: parseInt(postData.clubid),
          userid: parseInt(postData.userid),
          title: postData.title,
          description: postData.description,
        },
      });
      if (post) {
        res.json({
          message: "Post edited successfully",
        });
      } else {
        res.send("Error occured, failed to edit post");
      }
    }
    await prisma.analytics.create({
      data: {
        eventType: "edit-post",
        userid: parseInt(postData.userid),
        clubid: parseInt(postData.clubid),
        postid: post.postid,
      },
    });
  } catch (err) {
    console.error("Error adding post:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
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
      users: {
        select: {
          username: true,
        },
      },
    },
  });

  if (modList) {
    res.json(modList);
  } else {
    res.send("mod list can not be sent");
  }
});

app.get("/searchmods/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.query;
  try {
    if (id) {
      const searchResults = await prisma.clubmembers.findMany({
        where: {
          clubid: id,
          users: {
            username: {
              contains: name,
            },
          },
        },
        include: {
          users: {
            select: {
              username: true,
            },
          },
        },
      });
      console.log(searchResults);
      res.json(searchResults);
    } else {
      const searchResults = await prisma.users.findMany({
        where: {
          username: {
            contains: name,
          },
        },
        select: {
          userid: true,
          username: true,
        },
      });
      if (searchResults) {
        console.log(searchResults);
        const newMod = searchResults.map((user) => ({
          userclubid: null,
          clubid: null,
          userid: user.userid,
          users: {
            username: user.username,
          },
        }));
        console.log(newMod);
        res.json(newMod);
      }
    }
  } catch (error) {
    console.error("Error occured!", error);
  }
});

app.post("/clubcreate", upload.single("clublogo"), async (req, res) => {
  const clubdata = req.body;
  const modlist = req.body.mods;
  try {
    const { data, error } = await supabaseClient.storage
      .from("club-images")
      .upload(`images/${req.file.originalname}`, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error uploading image to Supabase" });
    }
    console.log(data);

    const imageurl = supabaseClient.storage
      .from("club-images")
      .getPublicUrl(data.path);

    const createClub = await prisma.clubs.create({
      data: {
        clubname: clubdata.clubname,
        clubdesc: clubdata.description,
        clublogo: imageurl.data.publicUrl,
      },
    });
    if (createClub) {
      res.send("club created");
    }
  } catch (err) {
    console.error("Error adding post:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.patch("/clubupdate/:id", upload.single("clublogo"), async (req, res) => {
  const clubdata = req.body;
  const id = parseInt(req.params.id);
  try {
    if (req.file) {
      const { data, error } = await supabaseClient.storage
        .from("club-images")
        .upload(`images/${req.file.originalname}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.log("Image upload error:", error);
        return res
          .status(500)
          .json({ error: "Error uploading image to Supabase" });
      }

      console.log(data);

      const imageurl = supabaseClient.storage
        .from("club-images")
        .getPublicUrl(data.path);

      const updateClub = await prisma.clubs.update({
        where: {
          clubid: id,
        },
        data: {
          clubname: clubdata.clubname,
          clubdesc: clubdata.description,
          clublogo: imageurl.data.publicUrl,
        },
      });
      if (updateClub) {
        res.status(200).send("Club has been updated");
      }
    } else {
      const updateClub = await prisma.clubs.update({
        where: {
          clubid: id,
        },
        data: {
          clubname: clubdata.clubname,
          clubdesc: clubdata.description,
        },
      });
      if (updateClub) {
        res.status(200).send("Club has been updated");
      }
    }
  } catch (err) {
    console.error("Error adding post:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/addmod", async (req, res) => {
  const modinfo = req.body;
  try {
    const result = await prisma.moderators.create({
      data: {
        userid: modinfo.userid,
        clubid: modinfo.clubid,
      },
    });
    if (result) {
      res.status(200).json({
        message: "Added new mod",
        newMod: {
          moderatorid: result.moderatorid,
          userid: result.userid,
          users: {
            username: modinfo.users.username,
          },
        },
      });
    }
  } catch (error) {
    console.error("Error occured, error message: ", error.message);
  }
});

app.delete("/removemod/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await prisma.moderators.delete({
    where: {
      moderatorid: id,
    },
  });
  if (result) {
    res.json(result);
  } else {
    res.status(400).send("Failed to delete moderator from the club");
  }
});

app.patch("/editprofile", async (req, res) => {
  const userdata = req.body;
  try {
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
      res.send("Profile updated successfully");
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
        console.log(passwordMatch);
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
          res.send("Profile updated successfully");
        } else {
          res.status(401).json({ error: "Incorrect Password!" });
          return;
        }
      }
    }
    await prisma.analytics.create({
      data: {
        eventType: "update-profile",
        userid: userdata.userid,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
