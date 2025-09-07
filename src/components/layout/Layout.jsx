import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import SearchAndFilterBar from "../search/SearchAndFilterBar";
import CharacterView from "../characters/lists/CharacterView";

export default function Layout() {
  const location = useLocation();
  const isCharacterPage = location.pathname.startsWith("/character/");

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    characterStatus: 'All',
    characterSpecies: 'All',
    characterGender: 'All',
    characterStatusFilter: 'All',
    sortDirection: 'A-Z',
  });
  const [pendingFilters, setPendingFilters] = useState(filterOptions);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handlePendingFilterChange = (updates) => {
    setPendingFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleApplyFilter = () => {
    setFilterOptions(pendingFilters);
  };

  const hasPendingChanges = 
    pendingFilters.characterStatus !== filterOptions.characterStatus ||
    pendingFilters.characterSpecies !== filterOptions.characterSpecies ||
    pendingFilters.characterGender !== filterOptions.characterGender ||
    pendingFilters.characterStatus !== filterOptions.characterStatusFilter ||
    pendingFilters.sortDirection !== filterOptions.sortDirection;

  return (
    <div className="h-screen bg-white text-gray-800 flex flex-col md:flex-row">
      <aside className="hidden md:flex w-96 bg-[#fafafa] px-1 py-10 flex-shrink-0 flex-col">
        <Header />
        <div className="m-4">
          <SearchAndFilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filterOptions={filterOptions}
            pendingFilters={pendingFilters}
            onFilterChange={handlePendingFilterChange}
            onApplyFilter={handleApplyFilter}
            hasPendingChanges={hasPendingChanges}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <CharacterView searchTerm={searchTerm} filterOptions={filterOptions} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden py-6 px-1">
        <div className={`md:hidden ${isCharacterPage ? 'hidden' : 'block'}`}>
          <Header isMobile={true} />
          <div className="m-4">
            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filterOptions={filterOptions}
              pendingFilters={pendingFilters}
              onFilterChange={handlePendingFilterChange}
              onApplyFilter={handleApplyFilter}
              hasPendingChanges={hasPendingChanges}
            />
          </div>
          <CharacterView searchTerm={searchTerm} filterOptions={filterOptions} />
        </div>

        <div className={`flex-1 flex items-center justify-center`}>
          {isCharacterPage ? (
            <Outlet />
          ) : (
            <div className="md:block hidden bg-white rounded-lg p-6 shadow-xl border border-gray-200 flex justify-center w-full max-w-sm">
              <p className="text-gray-500 text-center text-lg">
                Select a character to see more information
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};