import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const isAiCookedTable = pgTable("is_ai_cooked", {
  id: serial("id").primaryKey(),
  isCookedScore: integer("is_cooked_score").notNull(),
  isCookedReasoning: text("is_cooked_reasoning").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
