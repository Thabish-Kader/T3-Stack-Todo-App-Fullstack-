import React, { FC } from "react";
import { trpc } from "../utils/trpc";

interface TodoProps {
  todo: string;
  priority: string;
  dateCreated: Date;
}

export const TodoCards: FC<TodoProps> = ({ todo, priority, dateCreated }) => {
  return (
    <div className="flex w-[250px] cursor-pointer flex-col justify-center rounded-lg bg-black p-3 ">
      <h1 className="border-b border-white text-xl font-bold text-white">
        {todo}
      </h1>
      <span className="my-1 w-[66px] rounded-lg bg-red-500 px-1 text-center font-medium">
        {priority}
      </span>
      <h3 className="text-sm font-medium text-white">
        {dateCreated.toDateString()}
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <button className="rounded-lg bg-green-500 p-1  duration-500 hover:scale-110 hover:bg-white">
          Complete
        </button>
        <button className="rounded-lg bg-yellow-500 p-1  duration-500 hover:scale-110 hover:bg-white">
          Update
        </button>
      </div>
    </div>
  );
};
