"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedToken = localStorage.getItem("token");
      const userName = localStorage.getItem("name");
      setToken(storedToken);
      setName(userName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between px-10 py-4 bg-blue-400">
      <Link href={"/"} className="font-bold text-white text-2xl cursor-pointer">
        Detto
      </Link>
      <div>
        {token ? (
          <>
            <Link
              href={"/create-post"}
              className="text-white me-4 cursor-pointer"
            >
              Create Post
            </Link>

            <div className="group inline-block">
              <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                <span className="pr-1 font-semibold flex-1">{name}</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180
transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
transition duration-150 ease-in-out origin-top min-w-32"
              >
                <li
                  className="rounded-sm px-3 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/your-posts")}
                >
                  Your Posts
                </li>
                <li
                  className="rounded-sm px-3 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href={"/signup"} className="text-white me-4 cursor-pointer">
              Sign Up
            </Link>
            <Link href={"/login"} className="text-white me-4 cursor-pointer">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
