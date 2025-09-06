import React, { useState } from 'react';

export default function SearchFilter() {
  const [selectedCharacter, setSelectedCharacter] = useState('All');
  const [selectedSpecie, setSelectedSpecie] = useState('All');

  const isAnyFilterSelected = selectedCharacter !== 'All' || selectedSpecie !== 'All';

  return (
    <div className="bg-white rounded-lg p-6 shadow-xl md:border border-gray-200 w-full h-full flex flex-col">
      <div className="flex-grow">
        <div className="mb-4">
          <h3 className="text-gray-400 text-sm mb-2">Character</h3>
          <div className="flex space-x-2">
            {['All', 'Starred', 'Others'].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedCharacter(option)}
                className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                  selectedCharacter === option
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
                onClick={() => setSelectedSpecie(option)}
                className={`flex-1 p-3 rounded-lg text-sm border-gray-200 border shadow-xs transition ${
                  selectedSpecie === option
                    ? 'bg-primary-100 text-primary-600'
                    : 'hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex-shrink-0">
        <button
          className={`w-full py-2 rounded-lg ${
            isAnyFilterSelected
              ? 'bg-primary-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!isAnyFilterSelected}
        >
          Filter
        </button>
      </div>
    </div>
  );
}