"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { promptAnalysis, promptSearchKeywords } from "@/src/lib/prompts";
import { exaSearch, ExaSearchSchema } from "@/src/lib/services/exa";
import z from "zod";

export const isAiCooked = async () => {
  const model = google("gemini-2.5-flash");
  const { object: keywords } = await generateObject({
    model,
    prompt: promptSearchKeywords,
    schema: ExaSearchSchema,
    output: "array",
  });

  console.log("keywords", JSON.stringify(keywords, null, 2));

  const searchResults = await exaSearch({
    searches: keywords,
  });

  console.log("searchResults", JSON.stringify(searchResults, null, 2));

  const analysisPrompt = promptAnalysis(searchResults);

  const { object: analysis } = await generateObject({
    model,
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
  console.log("analysis", JSON.stringify(analysis, null, 2));

  return analysis;
};
