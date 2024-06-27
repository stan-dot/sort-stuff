import React, { useState } from 'react';

interface InputComponentProps {
  items: string[];
  setItems: (items: string[]) => void;
  handleNextState: () => void;
  placeholder: string;
  buttonText: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ items, setItems, handleNextState, placeholder, buttonText }) => {
  const [input, setInput] = useState<string>('');

  const handleAddItem = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const newItems = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        setItems([...items, ...newItems]);
      };
      reader.readAsText(file);
    }
  };

  const handlePasteLinks = () => {
    const newItems = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    setItems([...items, ...newItems]);
    setInput('');
  };

  return (
    <div>
      <h2>{buttonText}</h2>
      <input 
        type="text" 
        placeholder={placeholder} 
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.currentTarget.value) {
            handleAddItem(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }} 
      />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <textarea 
        placeholder="Paste links here" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handlePasteLinks}>Add Links</button>
      <button onClick={handleNextState}>{buttonText}</button>
    </div>
  );
};

export default InputComponent;
