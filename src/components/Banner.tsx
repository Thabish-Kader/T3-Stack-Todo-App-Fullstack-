import React, { useState } from "react";

export const Banner = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <section className="h-screen w-full bg-white py-20">
      <div className="mx-auto max-w-3xl ">
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
        <ul>
          {/* {data?.map((item) => {
            const { id, name, checked } = item;
            return (
              <li key={id} className="my-1 flex items-center justify-between">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 flex origin-left items-center justify-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: checkedItems.some((item) => item.id === id)
                          ? "100%"
                          : 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="h-[2px] w-full translate-y-px bg-red-500"
                    />
                  </div>
                  <span
                    onClick={() =>
                      checkItem.mutate({
                        id,
                        checked: checkedItems.some((item) => item.id === id)
                          ? false
                          : true,
                      })
                    }
                  >
                    {name}
                  </span>
                </div>
                <HiX
                  onClick={() => deleteItem.mutate({ id })}
                  size={24}
                  className="cursor-pointer text-red-500"
                />
              </li>
            );
          })} */}
        </ul>
      </div>
      {show && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col rounded-lg bg-black p-3  ">
              <h1 className="py-3 text-center text-2xl font-bold uppercase text-white">
                Add Item
              </h1>
              <input
                type="text"
                className="rounded-lg border border-black bg-gray-800 p-1 text-white placeholder:text-white"
                placeholder="Add Todo"
              />
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
