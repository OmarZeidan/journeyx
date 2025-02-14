import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("drivers").collect();
  },
});

export const createNew = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const driver = await ctx.db.insert("drivers", {
      name: args.name,
      location: args.location,
    });
    return driver;
  },
});

export const updateDriver = mutation({
  args: {
    id: v.id("drivers"),
    name: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, { ...rest });
    return { ...args };
  },
});

export const deleteDriver = mutation({
  args: { id: v.id("drivers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
