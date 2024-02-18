import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </Router>
  );
};

export default App;
