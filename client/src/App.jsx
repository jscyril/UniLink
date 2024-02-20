import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs";
import Annoucement from "./pages/Announcement"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clubs" element={<Clubs />} />
<<<<<<< HEAD
        <Route path="/announcements" element={<Annoucement />} />
=======
        {/* <Route path="/add-post" element={} /> */}
>>>>>>> 0edadbfeb4e4ceea850fb88c7e01dc3a808bb9dc
      </Routes>
    </Router>
  );
};

export default App;
