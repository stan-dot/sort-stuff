import React, { useEffect } from "react";

interface SortStuffsProps {
  stuffs: string[];
  categories: string[];
  sortedStructure: SortedStructure;
  handleSort: (stuff: string, category: string) => void;
  handleNextState: () => void;
}

const SortStuffs: React.FC<SortStuffsProps> = ({
  stuffs,
  categories,
  sortedStructure,
  handleSort,
  handleNextState,
}) => {
  const categoryKeys = "asdfghjkl";

  const handleKeyPress = (e: KeyboardEvent, stuffIndex: number) => {
    const keyIndex = categoryKeys.indexOf(e.key);
    if (keyIndex !== -1 && keyIndex < categories.length) {
      handleSort(stuffs[stuffIndex], categories[keyIndex]);
      if (stuffIndex === stuffs.length - 1) {
        handleNextState();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      stuffs.forEach((_, index) => handleKeyPress(e, index));
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stuffs, categories]);

  return (
    <div>
      <h2>Sort Stuffs</h2>
      {stuffs.map((stuff, index) => (
        <div key={index}>
          <p>{stuff}</p>
          {categories.map((category, catIndex) => (
            <button key={catIndex} onClick={() => handleSort(stuff, category)}>
              {category} ({categoryKeys[catIndex]})
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleNextState}>Finish</button>
    </div>
  );
};

export default SortStuffs;
