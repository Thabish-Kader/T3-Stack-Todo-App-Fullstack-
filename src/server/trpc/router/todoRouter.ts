import { contextProps } from "@trpc/react-query/dist/internals/context";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const todoRouter = router({
  // Create call
  createTodo: publicProcedure
    .input(
      z.object({
        todo: z.string(),
        priority: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { todo, priority } = input;
      return await ctx.prisma.todo.create({
        data: {
          todo: todo,
          priority: priority,
        },
      });
    }),
  showTodo: publicProcedure.query(async ({ input, ctx }) => {
    const todos = await ctx.prisma.todo.findMany();
    return todos;
  }),
  // delete call
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
  // update call
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.string(),
        priority: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          todo: input.todo,
          priority: input.priority,
        },
      });
    }),
});
