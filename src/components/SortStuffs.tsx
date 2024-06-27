import React, { useState, useEffect } from "react";

interface SortStuffsProps {
  stuffs: string[];
  categories: string[];
  setCategories: (categories: string[]) => void;
  handleSort: (stuff: string, category: string) => void;
  handleNextState: () => void;
}

const SortStuffs: React.FC<SortStuffsProps> = ({
  stuffs,
  categories,
  setCategories,
  handleSort,
  handleNextState,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newCategory, setNewCategory] = useState("");

  const handleCategorySelect = (category: string) => {
    handleSort(stuffs[currentIndex], category);
    if (currentIndex < stuffs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleNextState();
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const progress = (currentIndex / stuffs.length) * 100;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const categoryKeys = "asdfghjkl";
      if (e.key === "n") {
        const newCat = prompt("Enter new category:");
        if (newCat) {
          setCategories([...categories, newCat.trim()]);
        }
      } else {
        const keyIndex = categoryKeys.indexOf(e.key);
        if (keyIndex !== -1 && keyIndex < categories.length) {
          handleCategorySelect(categories[keyIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, categories]);

  return (
    <div>
      <h2>Sort Stuffs</h2>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ccc",
          borderRadius: "4px",
          margin: "1rem 0",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "#007bff",
            height: "10px",
            borderRadius: "4px",
          }}
        ></div>
      </div>
      {currentIndex < stuffs.length && (
        <div>
          <p>{stuffs[currentIndex]}</p>
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleCategorySelect(category)}>
              {category} ({"asdfghjkl"[index]})
            </button>
          ))}
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategory();
            }
          }}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default SortStuffs;
