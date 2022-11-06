import React, { FC } from "react";

export const Navbar: FC = () => {
  return (
    <nav className="fixed top-0  w-full bg-black p-3">
      <h1 className="text-center text-2xl font-bold uppercase text-white ">
        Full Stack T3 Todo App
      </h1>
    </nav>
  );
};
