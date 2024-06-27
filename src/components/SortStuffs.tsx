import React from "react";
import { SortedStructure } from "../types";

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
  return (
    <div>
      <h2>Sort Stuffs</h2>
      {stuffs.map((stuff, index) => (
        <div key={index}>
          <p>{stuff}</p>
          {categories.map((category, catIndex) => (
            <button key={catIndex} onClick={() => handleSort(stuff, category)}>
              {category}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleNextState}>Finish</button>
    </div>
  );
};

export default SortStuffs;
