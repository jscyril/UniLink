import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import ejs from 'ejs';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// Database
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMyIsImlhdCI6MTcwNzc5NzY0MywiZXhwIjoxNzA3ODAxMjQzfQ.FYjuZNxiCwTugz8d7z-k4c7B51oP7MUJ8KN0L_-49q0' }
];

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

// JWT
const JWT_SECRET = 'jwt_secret_key';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies['jwt'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

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

app.get('/profile', authenticateToken, (req, res) => {
  res.render('profile', { user: req.user });
});

app.post('/signup', (req, res) => {
  const { username,email, password } = req.body;
  // Add user to database
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  console.log(users);
  res.redirect('/');
});

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
