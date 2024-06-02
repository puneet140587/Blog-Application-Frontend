import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Services from "./Pages/Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserDashboard from "./Pages/UserDashboard";
import PrivateRoutes from "./Components/PrivateRoutes";
import ProfileInfo from "./Pages/User-routes/ProfileInfo";
import PostPage from "./Pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./Pages/Categories";
import UpdateBlog from "./Pages/UpdateBlog";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer /* position="bottom-center" */ />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/categories/:categoryId" element={<Categories />} />

          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile-info/:userId" element={<ProfileInfo />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
