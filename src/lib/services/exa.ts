import Exa from "exa-js";
import z from "zod";

export const exaClient = () => new Exa(process.env.EXA_API_KEY);

export const ExaSearchSchema = z.object({
  keywords: z.string(),
  resultType: z.enum([
    "company",
    "research paper",
    "news",
    "pdf",
    "github",
    "tweet",
    "personal site",
    "linkedin profile",
    "financial report",
  ]),
});

export const exaSearch = async ({
  searches,
}: {
  searches: z.infer<typeof ExaSearchSchema>[];
}): Promise<{ url: string; summary: string; title: string | null }[]> => {
  const exa = exaClient();
  const results = [];

  for (const { keywords, resultType } of searches) {
    const result = await exa.searchAndContents(keywords, {
      numResults: 1,
      type: "keyword",
      category: resultType,
      summary: true,
    });
    results.push(result);

    // Wait before the next request to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const resultsByUrl = results.flatMap((result) =>
    result.results.map((result) => ({
      url: result.url,
      summary: result.summary,
      title: result.title,
    }))
  );
  return resultsByUrl;
};
