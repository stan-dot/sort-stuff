import { useState } from 'react';
import SortStuffs from './components/SortStuffs'; // Ensure the correct path
import { SortedStructure } from './types';

enum AppStates {
  LANDING = "LANDING",
  ADD_STUFFS = "ADD_STUFFS",
  ADD_CATEGORIES = "ADD_CATEGORIES",
  SORT = "SORT",
  FINISHED = "FINISHED"
}

function App() {
  const [stuffs, setStuffs] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortedStructure, setSortedStructure] = useState<SortedStructure>({});
  const [currentState, setCurrentState] = useState<AppStates>(AppStates.LANDING);

  const handleAddStuffs = (newStuff: string) => {
    setStuffs([...stuffs, newStuff]);
  };

  const handleAddCategories = (newCategory: string) => {
    setCategories([...categories, newCategory]);
  };

  const handleSort = (stuff: string, category: string) => {
    setSortedStructure({
      ...sortedStructure,
      [category]: sortedStructure[category] ? [...sortedStructure[category], stuff] : [stuff]
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
        <div>
          <h2>Add Stuffs</h2>
          <input type="text" placeholder="Enter stuff" onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              handleAddStuffs(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }} />
          <ul>
            {stuffs.map((stuff, index) => (
              <li key={index}>{stuff}</li>
            ))}
          </ul>
          <button onClick={handleNextState}>Next</button>
        </div>
      )}
      {currentState === AppStates.ADD_CATEGORIES && (
        <div>
          <h2>Add Categories</h2>
          <input type="text" placeholder="Enter category" onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              handleAddCategories(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }} />
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <button onClick={handleNextState}>Next</button>
        </div>
      )}
      {currentState === AppStates.SORT && (
        <SortStuffs
          stuffs={stuffs}
          categories={categories}
          sortedStructure={sortedStructure}
          handleSort={handleSort}
          handleNextState={handleNextState}
        />
      )}
      {currentState === AppStates.FINISHED && (
        <div>
          <h2>Sorted Stuffs</h2>
          <pre>{JSON.stringify(sortedStructure, null, 2)}</pre>
          <button onClick={handleNextState}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
