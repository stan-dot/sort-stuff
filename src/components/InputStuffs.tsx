import React, { useState } from "react";

interface InputStuffsProps {
  stuffs: string[];
  setStuffs: (stuffs: string[]) => void;
  handleNextState: () => void;
}

const InputStuffs: React.FC<InputStuffsProps> = ({
  stuffs,
  setStuffs,
  handleNextState,
}) => {
  const [input, setInput] = useState<string>("");

  const handleAddStuffs = (newStuff: string) => {
    setStuffs([...stuffs, newStuff]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const newStuffs = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        setStuffs([...stuffs, ...newStuffs]);
      };
      reader.readAsText(file);
    }
  };

  const handlePasteLinks = () => {
    const newStuffs = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    setStuffs([...stuffs, ...newStuffs]);
    setInput("");
  };

  return (
    <div>
      <h2>Add Stuffs</h2>
      <input
        type="text"
        placeholder="Enter stuff"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            handleAddStuffs(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <ul>
        {stuffs.map((stuff, index) => (
          <li key={index}>{stuff}</li>
        ))}
      </ul>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <textarea
        placeholder="Paste links here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handlePasteLinks}>Add Links</button>
      <button onClick={handleNextState}>Next</button>
    </div>
  );
};

export default InputStuffs;
