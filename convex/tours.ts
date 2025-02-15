import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tours").collect();
  },
});

export const createNew = mutation({
  args: {
    customerName: v.string(),
    date: v.string(),
    location_from: v.string(),
    location_to: v.string(),
    driver: v.id("drivers"),
  },
  handler: async (ctx, args) => {
    const tour = await ctx.db.insert("tours", {
      ...args,
    });
    return tour;
  },
});

export const updateTour = mutation({
  args: {
    id: v.id("tours"),
    customerName: v.string(),
    date: v.string(),
    location_from: v.string(),
    location_to: v.string(),
    driver: v.id("drivers"),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, { ...rest });
    return { ...args };
  },
});

export const deleteTour = mutation({
  args: { id: v.id("tours") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
