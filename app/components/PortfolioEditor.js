import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

export default function PortfolioEditor({ data, onUpdate }) {
  const [editing, setEditing] = useState(false);

  const { trigger: editContent } = useCopilotAction({
    name: "editPortfolioContent",
    description: "Edit portfolio content with AI assistance",
    parameters: {
      content: "string",
      section: "string",
    },
    handler: async ({ content, section }) => {
      const response = await fetch("/api/enhance-content", {
        method: "POST",
        body: JSON.stringify({ content, section }),
      });

      const enhancedContent = await response.json();
      onUpdate(section, enhancedContent);
    },
  });

  const { trigger: reorganizeSkills } = useCopilotAction({
    name: "reorganizeSkills",
    description: "Reorganize skills into different categories",
    parameters: {
      skills: "array",
    },
    handler: async ({ skills }) => {
      const response = await fetch("/api/organize-skills", {
        method: "POST",
        body: JSON.stringify({ skills }),
      });

      const organizedSkills = await response.json();
      onUpdate("skills", organizedSkills);
    },
  });

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setEditing(!editing)}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg"
      >
        {editing ? "Save Changes" : "Edit Portfolio"}
      </button>

      {editing && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="font-bold mb-2">AI Editing Tools</h3>
          <button
            onClick={() =>
              editContent({ content: data.about, section: "about" })
            }
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Enhance About Section
          </button>
          <button
            onClick={() => reorganizeSkills({ skills: data.skills })}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Reorganize Skills
          </button>
        </div>
      )}
    </div>
  );
}
