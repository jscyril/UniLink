import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";
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
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to unauthorized page if auth is null and user is not on a public page
    if (
      auth === null &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/signin" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/unauthorized"
    ) {
      navigate("/unauthorized");
    }
  }, [auth, navigate]);

  if (auth === null) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    );
  }

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
