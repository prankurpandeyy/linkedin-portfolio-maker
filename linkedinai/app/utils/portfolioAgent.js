import { CopilotRuntime, GroqAdapter } from "@copilotkit/runtime";
import Groq from "groq-sdk";
import { LangGraph } from "@copilotkit/shared";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_CLOUD_API_KEY });

// Create portfolio enhancement nodes
const portfolioNodes = {
  enhanceAbout: async (data) => ({
    type: "about",
    content: data.about,
    enhanced: await enhanceContent(data.about, "about"),
  }),
  
  enhanceExperience: async (data) => ({
    type: "experience",
    content: data.experience,
    enhanced: await Promise.all(
      data.experience.map(async (exp) => ({
        ...exp,
        description: await enhanceContent(exp.description, "experience"),
      }))
    ),
  }),

  organizeSkills: async (data) => ({
    type: "skills",
    content: data.skills,
    organized: await categorizeSkills(data.skills),
  }),

  generatePortfolio: async (enhancedData) => ({
    type: "portfolio",
    content: await generatePortfolioTemplate(enhancedData),
  }),
};

// Create the LangGraph workflow
const portfolioGraph = new LangGraph({
  nodes: portfolioNodes,
  edges: [
    { from: "enhanceAbout", to: "generatePortfolio" },
    { from: "enhanceExperience", to: "generatePortfolio" },
    { from: "organizeSkills", to: "generatePortfolio" },
  ],
});

// Create CopilotKit runtime
const copilotKit = new CopilotRuntime({
  async onResponse({ message, context }) {
    try {
      if (message.type === "portfolio") {
        return {
          content: `@renderPortfolio(template: \`${message.content}\`)`,
        };
      }
      return message;
    } catch (error) {
      console.error("Error in onResponse:", error);
      return message;
    }
  },
});

// Create Groq adapter with Llama model
const serviceAdapter = new GroqAdapter({
  groq,
  model: "llama-3.3-70b-versatile",
  systemPrompt: `You are an AI portfolio enhancement agent. Your task is to:
1. Enhance professional descriptions to be more impactful
2. Organize skills into meaningful categories
3. Generate engaging portfolio content
4. Maintain professional tone while being personable

When processing content, focus on:
- Quantifiable achievements
- Key technologies and skills
- Professional impact
- Clear and concise writing`,
});

// Content enhancement function
async function enhanceContent(content, type) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Enhance this ${type} content to be more impactful and engaging while maintaining professionalism.`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0]?.message?.content || content;
}

// Skill categorization function
async function categorizeSkills(skills) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Organize these skills into categories like Technical, Soft Skills, Tools, etc.",
      },
      {
        role: "user",
        content: JSON.stringify(skills),
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return JSON.parse(completion.choices[0]?.message?.content || "{}");
}

export { portfolioGraph, copilotKit, serviceAdapter }; 