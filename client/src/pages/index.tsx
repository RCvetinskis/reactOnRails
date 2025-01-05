import PaginationContainer from "../components/pagination/pagination-container";
import PostsList from "../components/posts/posts-list";
import SearchInput from "../components/search/search-input";
import { usePostStore } from "../stores/post-store";
import { useSearchParams } from "react-router-dom";

const IndexPage = () => {
  const { posts, setPosts, totalPages } = usePostStore();
  const searchParams = useSearchParams()[0];

  return (
    <div>
      <header className="grid grid-cols-1 gap-3 my-4">
        <div>
          <h1 className="text-3xl font-bold">React on Rails Blog</h1>
          <p className="mt-2 text-gray-600">
            Find this application layout in client/src/app.tsx
          </p>
        </div>

        <SearchInput />
      </header>

      <PostsList
        posts={posts}
        setPosts={setPosts}
        page={Number(searchParams.get("page"))}
        q={searchParams.get("q")?.toString()}
      />
      {totalPages > 0 && (
        <footer className="pt-10">
          <PaginationContainer totalPages={totalPages} />
        </footer>
      )}
    </div>
  );
};

export default IndexPage;
