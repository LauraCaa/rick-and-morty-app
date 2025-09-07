import { useMemo } from 'react';

import { useGetCharacters } from "../../../services/charactersApi";
import { useFavorites } from "../../../context/FavoritesContext";
import { useDeletedCharacters } from "../../../context/DeletedCharactersContext";
import { useFilteredCharacters } from "../../../hooks/useFilteredCharacters";

import FavoriteCharacterList from "./FavoriteCharacterList";
import OtherCharacterList from "./OtherCharacterList";

export default function CharacterView({ searchTerm, filterOptions }) {
  const { favorites } = useFavorites();
  const { isDeleted } = useDeletedCharacters();
  const { loading, error, characters: allCharacters } = useGetCharacters();

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
      {favoriteCharacters.length > 0 && (
        <FavoriteCharacterList characters={favoriteCharacters}/>
      )}
      <OtherCharacterList characters={otherCharacters}/> 
    </div>
  );
};