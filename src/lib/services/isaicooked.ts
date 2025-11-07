"use server";

import { generateObject } from "ai";
import { promptAnalysis, promptSearchKeywords } from "@/src/lib/prompts";
import { exaSearch, ExaSearchSchema } from "@/src/lib/services/exa";
import z from "zod";

export const isAiCooked = async () => {
  const { object: keywords } = await generateObject({
    model: "openai/gpt-5",
    prompt: promptSearchKeywords,
    schema: ExaSearchSchema,
    output: "array",
  });

  const searchResults = await exaSearch({
    searches: keywords,
  });

  const analysisPrompt = promptAnalysis(searchResults);

  const { object: analysis } = await generateObject({
    model: "openai/gpt-5",
    prompt: analysisPrompt,
    schema: z.object({
      isCookedScore: z
        .number()
        .describe(
          "A score from 0 to 1 indicating how likely the investment thesis is to be true, aka 0 means AI is not cooked, 1 means AI is cooked."
        ),
      isCookedReasoning: z.string().describe("A reasoning for your score."),
    }),
  });

  // TODO store in db

  return analysis;
};
