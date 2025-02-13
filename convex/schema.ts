import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  tours: defineTable({
    name: v.string(),
    date: v.string(),
    location_from: v.string(),
    location_to: v.string(),
    driver: v.string(),
  }),
  drivers: defineTable({
    name: v.string(),
    location: v.string(),
  }),
})
