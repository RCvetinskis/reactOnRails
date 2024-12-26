import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages";
import PostDetailsPage from "../pages/post-details-page";
import NewPostPage from "../pages/new-post-page";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="post/:id" element={<PostDetailsPage />} />
      <Route path="/new" element={<NewPostPage />} />
    </Routes>
  );
};

export default AppRouter;
