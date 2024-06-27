import React, { useState } from 'react';

interface TreeNodeProps {
  node: any;
  onDropNode: (draggedNode: any, targetNode: any) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onDropNode }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('node', JSON.stringify(node));
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedNode = JSON.parse(e.dataTransfer.getData('node'));
    onDropNode(draggedNode, node);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      style={{
        padding: '8px',
        margin: '4px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: isDragging ? '#f0f0f0' : '#fff',
        color: '#333', // Ensuring the text is visible on a white background
      }}
    >
      <strong>{node.title}</strong>
      {node.items && node.items.length > 0 && (
        <ul style={{ paddingLeft: '20px' }}>
          {node.items.map((item: any, index: number) => (
            <li key={index} style={{ listStyleType: 'none' }}>
              - {item}
            </li>
          ))}
        </ul>
      )}
      {node.children && node.children.length > 0 && (
        <div style={{ paddingLeft: '20px' }}>
          {node.children.map((childNode: any, index: number) => (
            <TreeNode key={index} node={childNode} onDropNode={onDropNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
