import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages";
import PostDetailsPage from "../pages/post-details-page";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="post/:id" element={<PostDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
