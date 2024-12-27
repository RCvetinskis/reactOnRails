import PostsList from "../components/posts/posts-list";

const IndexPage = () => {
  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold">React on Rails Blog</h1>
        <p className="mt-2 text-gray-600">
          Find this application layout in client/src/app.tsx
        </p>
      </header>

      <PostsList />
    </div>
  );
};

export default IndexPage;
