import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="flex shadow-md bg-gray-500 text-white justify-between items-center h-[50px] px-5">
      <h3 className="font-bold">GitHub Search</h3>
      <span>
        <Link to={"/"}>Home</Link> <Link to={"/favorite"}>Favorites</Link>
      </span>
    </nav>
  );
};
