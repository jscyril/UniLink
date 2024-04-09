import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Postopen";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs";
import Annoucement from "./pages/Announcement";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ClubOpen from "./pages/ClubOpen";
import CreatePost from "./pages/CreatePost";
import ClubCreateupdate from "./pages/ClubCreateupdate";
import ClubModeration from "./pages/ClubModeration";
import RequireAuth from "./components/RequireAuth";
import AdminDashboard from "./pages/AdminDashboard";
import UnauthorizedPage from "./components/Unauthorized";
import EditProfilePage from "./pages/EditProfilePage";
import Postopen from "./pages/Postopen";
import EditPost from "./pages/EditPost";
import Analytics from "./pages/Analytics";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/clubmoderation" element={<ClubModeration />} />
        <Route path="/clubcreateupdate/:id" element={<ClubCreateupdate />} />
        <Route path="/clubcreateupdate" element={<ClubCreateupdate />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<Postopen />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/announcements" element={<Annoucement />} />
        <Route path="/addpost/:id" element={<CreatePost />} />
        <Route path="/club/:id" element={<ClubOpen />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Route>
    </Routes>
  );
};

export default App;
