import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChainTool } from "langchain/tools";

export class PortfolioAgent {
  constructor() {
    this.llm = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createTools() {
    // Create specialized chains for each section
    const aboutChain = new LLMChain({
      llm: this.llm,
      prompt: PromptTemplate.fromTemplate(
        `Transform this professional summary into an engaging and personal about section:
        {input}
        
        Make it more conversational while maintaining professionalism.`
      ),
    });

    const experienceChain = new LLMChain({
      llm: this.llm,
      prompt: PromptTemplate.fromTemplate(
        `Enhance this work experience description to highlight achievements and impact:
        {input}
        
        Focus on quantifiable results and key contributions.`
      ),
    });

    const skillsChain = new LLMChain({
      llm: this.llm,
      prompt: PromptTemplate.fromTemplate(
        `Organize and categorize these skills into meaningful groups:
        {input}
        
        Group them by type (e.g., Technical, Soft Skills, Tools) and order by relevance.`
      ),
    });

    // Create tools from chains
    return [
      new ChainTool({
        name: "AboutSection",
        description: "Improves the about section text",
        chain: aboutChain,
      }),
      new ChainTool({
        name: "ExperienceEnhancer",
        description: "Enhances work experience descriptions",
        chain: experienceChain,
      }),
      new ChainTool({
        name: "SkillsOrganizer",
        description: "Organizes and categorizes skills",
        chain: skillsChain,
      }),
    ];
  }

  async processProfile(profileData) {
    const tools = await this.createTools();
    
    const executor = await initializeAgentExecutorWithOptions(tools, this.llm, {
      agentType: "chat-conversational-react-description",
      verbose: true,
    });

    // Process each section
    const enhancedProfile = { ...profileData };

    // Enhance about section
    if (profileData.about) {
      const aboutResult = await executor.call({
        input: profileData.about,
      });
      enhancedProfile.about = aboutResult.output;
    }

    // Enhance experience descriptions
    if (profileData.experience) {
      enhancedProfile.experience = await Promise.all(
        profileData.experience.map(async (exp) => {
          const result = await executor.call({
            input: exp.description,
          });
          return {
            ...exp,
            description: result.output,
          };
        })
      );
    }

    // Organize skills
    if (profileData.skills) {
      const skillsResult = await executor.call({
        input: profileData.skills.join(", "),
      });
      enhancedProfile.skills = this.parseSkills(skillsResult.output);
    }

    return enhancedProfile;
  }

  parseSkills(skillsOutput) {
    // Parse the organized skills output into categories
    const skillCategories = {};
    const lines = skillsOutput.split("\n");
    let currentCategory = "Other";

    lines.forEach(line => {
      if (line.endsWith(":")) {
        currentCategory = line.slice(0, -1);
        skillCategories[currentCategory] = [];
      } else if (line.trim()) {
        const skills = line.split(",").map(s => s.trim());
        if (skillCategories[currentCategory]) {
          skillCategories[currentCategory].push(...skills);
        }
      }
    });

    return skillCategories;
  }
} 