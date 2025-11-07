export const promptSearchKeywords = `
Generate a list of keywords that help us validate our investment thesis.

We are looking to take a pulse check on various industry leaders and capital allocators to determine a belief of whether the investments being made into AI are overblown or not.

Essentially, our thesis is once major AI providers (OpenAI, Anthropic, Google) and their leadership (Sam Altman, Dario Amodei, Sundar Pichai) begin to speak more and more about the profitablility of thier models, we are bullish on the future of AI.

For these industry leaders, lets look to personal tweets from leadership, press releases, or other public statements.

We should also look to the large capital allocators of the world, namely pension funds, sovreign wealth funds, or other large banks (Deutsche Bank, JP Morgan, etc.) to see if they are bullish on the future of AI ie. hedging investments made into AI.
`;

export const promptAnalysis = (
  searchResults: { url: string; summary: string; title: string | null }[]
) => {
  return `
Analyze the following search results and determine if they support our investment thesis.

You will be providing a score from 0 to 1 indicating how likely the investment thesis is to be true, aka 0 means AI is not cooked, 1 means AI is cooked.

Also provide a reasoning for your score.

We are looking to take a pulse check on various industry leaders and capital allocators to determine a belief of whether the investments being made into AI are overblown or not.

Our thesis is once major AI providers (OpenAI, Anthropic, Google) and their leadership (Sam Altman, Dario Amodei, Sundar Pichai) begin to speak more and more about the profitablility of thier models, we are bullish on the future of AI.

<search-results>
${searchResults
  .map((result) => `- ${result.title}: ${result.summary}`)
  .join("\n")}
</search-results>
`;
};
