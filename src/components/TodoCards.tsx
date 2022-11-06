import { Todo } from "@prisma/client";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

interface TodoProps {
  id: string;
  todo: string;
  priority: string;
  dateCreated: Date;
}

export const TodoCards: FC<TodoProps> = ({
  todo,
  priority,
  dateCreated,
  id,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Todo>();
  const deleteTodo = trpc.todo.deleteTodo.useMutation();
  const updateTodo = trpc.todo.updateTodo.useMutation();

  const onSubmit: SubmitHandler<Todo> = (data) => {
    updateTodo.mutate({
      id: id,
      todo: data.todo,
      priority: data.priority,
    });
    setShow(!show);
    console.log(data.id);
  };

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
        <button
          onClick={() => deleteTodo.mutate({ id })}
          className="rounded-lg bg-green-500 p-1  duration-500 hover:scale-110 hover:bg-white"
        >
          Complete
        </button>
        <button
          onClick={() => setShow(true)}
          className="rounded-lg bg-yellow-500 p-1  duration-500 hover:scale-110 hover:bg-white"
        >
          Update
        </button>
      </div>

      {/* Update Pop up */}
      {show && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col rounded-lg bg-black p-3  ">
              <h1 className="py-3 text-center text-2xl font-bold uppercase text-white">
                Add Item
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid">
                  <input
                    {...register("todo")}
                    type="text"
                    className="rounded-lg border border-black bg-gray-800 p-1 text-white placeholder:text-white"
                    placeholder="Add Todo"
                  />
                  <select
                    {...register("priority")}
                    className="my-2 rounded-lg bg-gray-800 p-1 text-white"
                  >
                    <option value="!!!!!">High</option>
                    <option value="!!!">Medium</option>
                    <option value="!">Low</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-1 py-2">
                  <button className=" rounded-lg bg-yellow-500 p-2 text-lg font-medium duration-500 hover:scale-110 hover:bg-white">
                    Update
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className="rounded-lg bg-gray-500 p-2 text-lg font-medium duration-500 hover:scale-110 hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
