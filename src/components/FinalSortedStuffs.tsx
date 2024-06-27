import React from "react";
import { SortedStructure } from "../types";

interface FinalSortedStuffsProps {
  sortedStructure: SortedStructure;
  handleRestart: () => void;
}

const FinalSortedStuffs: React.FC<FinalSortedStuffsProps> = ({
  sortedStructure,
  handleRestart,
}) => {
  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sortedStructure, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sorted_stuffs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadMarkdown = () => {
    let markdownContent = "# My Stuffs Sorted\n";
    for (const category in sortedStructure) {
      markdownContent += `## ${category}\n`;
      sortedStructure[category].forEach((item) => {
        markdownContent += `- ${item}\n`;
      });
      markdownContent += "\n";
    }
    const dataStr =
      "data:text/markdown;charset=utf-8," + encodeURIComponent(markdownContent);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sorted_stuffs.md");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div>
      <h2>Sorted Stuffs</h2>
      <pre>{JSON.stringify(sortedStructure, null, 2)}</pre>
      <button onClick={downloadJson}>Download JSON</button>
      <button onClick={downloadMarkdown}>Download Markdown</button>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default FinalSortedStuffs;
