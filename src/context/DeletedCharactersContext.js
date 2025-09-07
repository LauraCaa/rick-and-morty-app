import { createContext, useState, useContext } from 'react';

const DeletedCharactersContext = createContext();

export const useDeletedCharacters = () => {
  return useContext(DeletedCharactersContext);
};

export default function DeletedCharactersProvider({ children }) {
  const [deletedCharacters, setDeletedCharacters] = useState(new Set());

  const softDeleteCharacter = (characterId) => {
    setDeletedCharacters(prevDeleted => {
      const newDeleted = new Set(prevDeleted);
      newDeleted.add(characterId);
      return newDeleted;
    });
  };

  const isDeleted = (characterId) => deletedCharacters.has(characterId);

  return (
    <DeletedCharactersContext.Provider value={{ deletedCharacters, softDeleteCharacter, isDeleted }}>
      {children}
    </DeletedCharactersContext.Provider>
  );
};