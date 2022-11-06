import { Todo } from "@prisma/client";
import { Mutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { TodoCards } from "./TodoCards";

export const Banner = () => {
  const [show, setShow] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const { register, handleSubmit } = useForm<Todo>();
  const { data, refetch, isSuccess } = trpc.todo.showTodo.useQuery(undefined);

  useEffect(() => {
    if (isSuccess) {
    }
  });

  const addTodo = trpc.todo.createTodo.useMutation({
    onSuccess: (data) => {
      setTodoList((prev) => [...prev, data]);
    },
  });

  const onSubmit: SubmitHandler<Todo> = (data) => {
    addTodo.mutate({ todo: data.todo, priority: data.priority });
    setShow(!show);
    console.log(data.todo, data.priority);
  };

  return (
    <section className="mx-auto h-screen w-full max-w-6xl bg-white px-2 py-20">
      <div className="mx-auto w-full ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My Todos</h2>
          <button
            type="button"
            onClick={() => setShow(true)}
            className="rounded-lg bg-green-500 p-2 text-lg font-medium text-white duration-500 hover:scale-110 hover:bg-black hover:text-white"
          >
            Add Todo
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-1 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((items) => (
          <TodoCards
            key={items.id}
            id={items.id}
            todo={items.todo}
            priority={items.priority}
            dateCreated={items.createdAt}
          />
        ))}
      </div>

      {/* Pop for when add to do button is clicked */}
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
                    onChange={(e) => setTodo(e.target.value)}
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
                  <button className=" rounded-lg bg-green-500 p-2 text-lg font-medium duration-500 hover:scale-110 hover:bg-white">
                    Add
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
    </section>
  );
};
