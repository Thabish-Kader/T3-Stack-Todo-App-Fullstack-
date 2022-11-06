import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const todoRouter = router({
  // Create to do route
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
});