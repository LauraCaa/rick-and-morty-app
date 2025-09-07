export default function SearchFilter({ onApplyFilter, onClose, pendingFilters, onFilterChange }) {
  
  const handleCharacterSelect = (option) => {
    onFilterChange({ characterStatus: option });
  };
  
  const handleSpecieSelect = (option) => {
    onFilterChange({ characterSpecies: option });
  };
  
  const handleSortChange = (direction) => {
    onFilterChange({ sortDirection: direction });
  };

  const handleApply = () => {
    onApplyFilter();
    onClose();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-xl md:border border-gray-200 w-full h-full flex flex-col">
      <div className="flex-grow">
        <div className="mb-4">
          <h3 className="text-gray-400 text-sm mb-2">Character</h3>
          <div className="flex space-x-2">
            {['All', 'Starred', 'Others'].map((option) => (
              <button
                key={option}
                onClick={() => handleCharacterSelect(option)}
                className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                  pendingFilters.characterStatus === option
                    ? 'bg-primary-100 text-primary-600'
                    : 'hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-400 text-sm mb-2">Specie</h3>
          <div className="flex space-x-2">
            {['All', 'Human', 'Alien'].map((option) => (
              <button
                key={option}
                onClick={() => handleSpecieSelect(option)}
                className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                  pendingFilters.characterSpecies === option
                    ? 'bg-primary-100 text-primary-600'
                    : 'hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-400 text-sm mb-2">Sort by Name</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSortChange('A-Z')}
              className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                pendingFilters.sortDirection === 'A-Z'
                  ? 'bg-primary-100 text-primary-600'
                  : 'hover:bg-primary-100 hover:text-primary-600'
              }`}
            >
              A-Z
            </button>
            <button
              onClick={() => handleSortChange('Z-A')}
              className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                pendingFilters.sortDirection === 'Z-A'
                  ? 'bg-primary-100 text-primary-600'
                  : 'hover:bg-primary-100 hover:text-primary-600'
              }`}
            >
              Z-A
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto flex-shrink-0">
        <button
          onClick={handleApply}
          className={`w-full py-3 rounded-lg bg-primary-600 text-white hover:bg-purple-700`}
        >
          Filter
        </button>
      </div>
    </div>
  );
};