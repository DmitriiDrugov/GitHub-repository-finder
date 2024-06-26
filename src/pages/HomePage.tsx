import { useEffect, useState } from "react";
import {
  useLazyGetUsersReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounse";
import { RepoCart } from "../components/RepoCart";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounceSearch = useDebounce(search);
  const { isLoading, data, isError } = useSearchUsersQuery(debounceSearch, {
    skip: debounceSearch.length < 2,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUsersReposQuery();
  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };
  useEffect(() => {
    setDropdown(debounceSearch.length > 2 && data?.length! > 0);
  }, [debounceSearch, data]);
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}
      <div className="relative w-[560px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border py-2 px-4 w-full h-[42px] mb-2 "
          placeholder="Search users"
        />
        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Loading...</p>}
          {repos?.map((repo) => (
            <RepoCart key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
