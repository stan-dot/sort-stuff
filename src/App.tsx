import { useState } from "react";
import FinalSortedStuffs from "./components/FinalSortedStuffs";
import InputComponent from "./components/InputComponent";
import SortStuffs from "./components/SortStuffs";
import '@nosferatu500/react-sortable-tree/style.css';

enum AppStates {
  LANDING = "LANDING",
  ADD_STUFFS = "ADD_STUFFS",
  ADD_CATEGORIES = "ADD_CATEGORIES",
  SORT = "SORT",
  FINISHED = "FINISHED",
}

type SortedStructure = {
  [category: string]: string[];
};

function App() {
  const [stuffs, setStuffs] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortedStructure, setSortedStructure] = useState<SortedStructure>({});
  const [currentState, setCurrentState] = useState<AppStates>(
    AppStates.LANDING
  );

  const handleSort = (stuff: string, category: string) => {
    setSortedStructure({
      ...sortedStructure,
      [category]: sortedStructure[category]
        ? [...sortedStructure[category], stuff]
        : [stuff],
    });
  };

  const handleNextState = () => {
    switch (currentState) {
      case AppStates.LANDING:
        setCurrentState(AppStates.ADD_STUFFS);
        break;
      case AppStates.ADD_STUFFS:
        setCurrentState(AppStates.ADD_CATEGORIES);
        break;
      case AppStates.ADD_CATEGORIES:
        setCurrentState(AppStates.SORT);
        break;
      case AppStates.SORT:
        setCurrentState(AppStates.FINISHED);
        break;
      case AppStates.FINISHED:
        setCurrentState(AppStates.LANDING);
        setStuffs([]);
        setCategories([]);
        setSortedStructure({});
        break;
    }
  };

  return (
    <div>
      <p>sort-stuff</p>
      {currentState === AppStates.LANDING && (
        <div>
          <h2>Welcome to Sort Stuff App</h2>
          <button onClick={handleNextState}>Start</button>
        </div>
      )}
      {currentState === AppStates.ADD_STUFFS && (
        <InputComponent
          items={stuffs}
          setItems={setStuffs}
          handleNextState={handleNextState}
          placeholder="Enter stuff"
          buttonText="Next"
        />
      )}
      {currentState === AppStates.ADD_CATEGORIES && (
        <InputComponent
          items={categories}
          setItems={setCategories}
          handleNextState={handleNextState}
          placeholder="Enter category"
          buttonText="Next"
        />
      )}
      {currentState === AppStates.SORT && (
        <SortStuffs
          stuffs={stuffs}
          categories={categories}
          setCategories={setCategories}
          handleSort={handleSort}
          handleNextState={handleNextState}
        />
      )}
      {currentState === AppStates.FINISHED && (
        <FinalSortedStuffs
          sortedStructure={sortedStructure}
          handleRestart={handleNextState}
        />
      )}
    </div>
  );
}

export default App;
