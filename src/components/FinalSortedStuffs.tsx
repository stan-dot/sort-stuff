import React, { useState, useEffect } from "react";
import { downloadJson, downloadMarkdown } from "../utils/downloads";
import { SortedStructure } from "../types";
import TreeNode from "./TreeNode";

interface FinalSortedStuffsProps {
  sortedStructure: SortedStructure;
  handleRestart: () => void;
}

const FinalSortedStuffs: React.FC<FinalSortedStuffsProps> = ({
  sortedStructure,
  handleRestart,
}) => {
  const [treeData, setTreeData] = useState(() =>
    Object.keys(sortedStructure).map((category) => ({
      id: category,
      title: category,
      items: sortedStructure[category],
      children: [],
    }))
  );
  const [originalTreeData] = useState(treeData);
  const [updatedStructure, setUpdatedStructure] = useState(sortedStructure);

  const handleDropNode = (draggedNode: any, targetNode: any) => {
    const updatedTreeData = treeData
      .map((node) => {
        if (node.id === targetNode.id) {
          return {
            ...node,
            children: [...node.children, draggedNode],
          };
        } else if (node.id === draggedNode.id) {
          return null;
        } else {
          return node;
        }
      })
      .filter((node) => node !== null);

    setTreeData(updatedTreeData as any[]);
  };

  const handleReset = () => {
    setTreeData(originalTreeData);
  };

  useEffect(() => {
    const convertTreeToStructure = (nodes: any[]): SortedStructure => {
      const structure: SortedStructure = {};
      nodes.forEach((node) => {
        structure[node.title] = node.items;
        if (node.children && node.children.length > 0) {
          const childStructure = convertTreeToStructure(node.children);
          Object.keys(childStructure).forEach((key) => {
            structure[key] = childStructure[key];
          });
        }
      });
      return structure;
    };

    setUpdatedStructure(convertTreeToStructure(treeData));
  }, [treeData]);

  return (
    <div>
      <h2>Sorted Stuffs</h2>
      <div>
        <h3> original one</h3>
        <pre>{JSON.stringify(updatedStructure, null, 2)}</pre>
      </div>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {treeData.map((node, index) => (
          <TreeNode key={index} node={node} onDropNode={handleDropNode} />
        ))}
      </div>
      <button
        onClick={() => downloadJson(updatedStructure, "sorted_stuffs.json")}
      >
        Download JSON
      </button>
      <button onClick={() => downloadMarkdown(treeData, "sorted_stuffs.md")}>
        Download Markdown
      </button>
      <button onClick={handleReset}>Reset Tree</button>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default FinalSortedStuffs;
