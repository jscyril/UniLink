import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { homePageJSON } from "./dbSim.js";
import { profileInfo } from "./dbSim.js";
import { clubsList } from "./dbSim.js";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());

const users = [
  { id: 1, username: 'user1', email:"a@gmail.com", password: 'password1' },
  { id: 2, username: 'user2', email:"a@gmail.com", password: 'password2' }
];


app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesFolderPath = join(__dirname, "../unilink/public");

app.use("/public", express.static(imagesFolderPath));

const port = 3000;

// console.log(homePageJSON);

app.get("/", (req, res) => {
  res.json(homePageJSON);
  // res.send("This is home page json");
});

app.get("/post",(req, res) => {
  res.send("This is post page");
});

app.get("/profile", (req, res) => {
  res.json(profileInfo);
});

app.get("/clubs",(req,res)=>{
  res.json(clubsList);
});

app.post('/signup', (req, res) => {
  const { username,email, password } = req.body;
  console.log(req.body.username);
  const newUser = { id: users.length + 1, username: username , email: email, password:password };
  users.push(newUser);
  console.log(users);
  res.json(users);
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  })
);



const JWT_SECRET = 'jwt_secret_key';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

app.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }

    // Manually establish the session...
    req.login(user, (err) => {
      if (err) { return next(err); }

      // Generate a JWT token and set it in the cookies
      const token = generateToken(user);
      console.log(token);
      res.cookie('jwt', token);

      return res.render('profile', { user: req.user });
    });

  })(req, res, next);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
