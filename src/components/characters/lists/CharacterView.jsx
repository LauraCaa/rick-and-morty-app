import { useMemo } from 'react';
import { useGetCharacters } from "../../../services/charactersApi";
import { useFavorites } from "../../../context/FavoritesContext";
import { useDeletedCharacters } from "../../../context/DeletedCharactersContext";
import { useFilteredCharacters } from "../../../hooks/useFilteredCharacters";
import FilterStatus from "../search/FilterStatus";

import FavoriteCharacterList from "./FavoriteCharacterList";
import OtherCharacterList from "./OtherCharacterList";

export default function CharacterView({ searchTerm, filterOptions }) {
  const { favorites } = useFavorites();
  const { isDeleted } = useDeletedCharacters();
  const { loading, error, characters: allCharacters } = useGetCharacters();

  const activeFiltersCount = Object.values(filterOptions).filter(value => value !== 'All' && value !== 'A-Z' && value !== '').length;

  const isFilterActive = searchTerm !== '' || activeFiltersCount > 0;

  const filteredCharacters = useFilteredCharacters(allCharacters, {
    searchTerm,
    filterOptions,
    favorites,
    isDeleted,
  });

  const [favoriteCharacters, otherCharacters] = useMemo(() => {
    if (!filteredCharacters) return [[], []];
    const favoritesList = [];
    const othersList = [];
    
    filteredCharacters.forEach(character => {
      if (favorites.has(character.id)) {
        favoritesList.push(character);
      } else {
        othersList.push(character);
      }
    });

    return [favoritesList, othersList];
  }, [filteredCharacters, favorites]);

  if (loading) return <p className="text-gray-500 text-center p-4">Loading characters...</p>;
  if (error) return <p className="text-red-500 text-center p-4">Error: {error.message}</p>;

  return (
    <div>
      {isFilterActive && (
        <FilterStatus resultsCount={filteredCharacters.length} filtersCount={activeFiltersCount} />
      )}
      
      {(filterOptions.characterStatus === 'All' || filterOptions.characterStatus === 'Starred') && favoriteCharacters.length > 0 && (
        <FavoriteCharacterList characters={favoriteCharacters}/>
      )}

      {(filterOptions.characterStatus === 'All' || filterOptions.characterStatus === 'Others') && otherCharacters.length > 0 && (
        <OtherCharacterList characters={otherCharacters}/> 
      )}
      
      {filteredCharacters.length === 0 && (
        <p className="text-gray-500 text-center p-4">No characters found matching the filters.</p>
      )}
    </div>
  );
};