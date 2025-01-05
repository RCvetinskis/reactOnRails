import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages";
import PostDetailsPage from "../pages/post/post-details-page";
import NewPostPage from "../pages/post/new-post-page";
import PostEditPage from "../pages/post/post-edit-page";
import RegisterPage from "../pages/auth/register-page";
import LoginPage from "../pages/auth/login-page";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="post/:id" element={<PostDetailsPage />} />
    <Route path="/new" element={<NewPostPage />} />
    <Route path="post/:id/edit" element={<PostEditPage />} />
    <Route path="/sign-in" element={<LoginPage />} />
    <Route path="/sign-up" element={<RegisterPage />} />
  </Routes>
);

export default AppRouter;
