export const downloadJson = (data: any, filename: string) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadMarkdown = (data: any, filename: string) => {
  const buildMarkdown = (nodes: any[], indent = ""): string => {
    return nodes
      .map((node) => {
        const childrenMarkdown = node.children
          ? buildMarkdown(node.children as any[], `${indent}  `)
          : "";
        const itemsMarkdown = node.items
          ? node.items.map((item: string) => `${indent}- ${item}\n`).join("")
          : "";
        return `${indent}## ${node.title}\n${itemsMarkdown}${childrenMarkdown}`;
      })
      .join("\n");
  };

  const markdownContent = `# My Stuffs Sorted\n${buildMarkdown(data)}`;
  const dataStr =
    "data:text/markdown;charset=utf-8," + encodeURIComponent(markdownContent);
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
