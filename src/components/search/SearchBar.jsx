import React, { useState } from 'react';
import SearchFilter from './SearchFilter';

export default function SearchBar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between bg-[#f3f4f6] rounded-lg py-1 px-3 md:px-4 md:py-3 md:my-4">
        <div className="flex items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 mr-2"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
          </svg>
          <input
            type="text"
            placeholder="Search or filter results"
            className="w-full outline-none bg-gray-100 placeholder:text-[14px] placeholder-gray-500"
          />
        </div>

        <button 
          onClick={handleToggleFilter} 
          className="p-2 text-purple-600 md:hover:bg-primary-100 rounded-lg transition cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3V1M9 3C7.89543 3 7 3.89543 7 5C7 6.10457 7.89543 7 9 7M9 3C10.1046 3 11 3.89543 11 5C11 6.10457 10.1046 7 9 7M3 15C4.10457 15 5 14.1046 5 13C5 11.8954 4.10457 11 3 11M3 15C1.89543 15 1 14.1046 1 13C1 11.8954 1.89543 11 3 11M3 15V17M3 11V1M9 7V17M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11M15 15C13.8954 15 13 14.1046 13 13C13 11.8954 13.8954 11 15 11M15 15V17M15 11V1" stroke="#8054C7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {isFilterOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-white md:hidden pt-10 p-4 flex flex-col">
            <div className="relative flex justify-center items-center mb-6 flex-shrink-0">
              <button onClick={handleToggleFilter} className="absolute left-6 text-primary-600">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15L1 8M1 8L8 1M1 8L19 8" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="text-xl semibold-text">Filters</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
              <SearchFilter />
            </div>
          </div>
          
          <div className="absolute top-full right-0 bg-white mt-2 w-full z-10 hidden md:block rounded-lg">
            <SearchFilter />
          </div>
        </>
      )}
    </div>
  );
}
