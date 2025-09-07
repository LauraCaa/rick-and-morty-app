import { useMemo } from "react";

export const useFilteredCharacters = (characters, { searchTerm, filterOptions, favorites, isDeleted }) => {
  return useMemo(() => {
    if (!characters) return [];

    const filtered = characters
      .filter(character => !isDeleted(character.id))
      .filter(character => {
        if (filterOptions.characterStatus === 'Starred') {
          return favorites.has(character.id);
        } else if (filterOptions.characterStatus === 'Others') {
          return !favorites.has(character.id);
        }
        return true;
      })
      .filter(character => {
        const matchesSearch = !searchTerm || character.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecies =
          filterOptions.characterSpecies === 'All' ||
          character.species.toLowerCase() === filterOptions.characterSpecies.toLowerCase();

        const matchesGender =
          filterOptions.characterGender === 'All' ||
          character.gender.toLowerCase() === filterOptions.characterGender.toLowerCase();
        
        const matchesStatus =
          filterOptions.characterStatusFilter === "All" ||
          character.status.toLowerCase() === filterOptions.characterStatusFilter.toLowerCase();

        return matchesSearch && matchesSpecies && matchesGender && matchesStatus;
      });

    return [...filtered].sort((a, b) => {
      if (filterOptions.sortDirection === 'A-Z') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  }, [characters, searchTerm, filterOptions, favorites, isDeleted]);
};
