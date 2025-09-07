import { useNavigate, useParams } from "react-router-dom";

import { useDeletedCharacters } from "../../../context/DeletedCharactersContext";
import { useFavorites } from '../../../context/FavoritesContext';
import { useGetCharacter } from "../../../services/charactersApi";

import CommentsSection from "../../comments/CommentsSection";
import DeleteCharacterButton from "./DeleteCharacterButton";
import FavoriteButton from "../../ui/FavoriteButton";
import BackButton from "../../ui/BackButton";
import CharacterDetails from "./CharacterDetails";

export default function CharacterCard() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, character } = useGetCharacter(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDeleted } = useDeletedCharacters();

  if (isDeleted(id)) {
    navigate("/");
    return null;
  };

  if (loading) return (
    <div className="flex flex-grow items-center justify-center">
      <p className="text-gray-500 text-center text-lg">Loading character...</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-grow items-center justify-center">
      <p className="text-red-500 text-center text-lg">Error: Character not found.</p>
    </div>
  );
  
  if (!character) return null;
  const isCharacterFavorite = isFavorite(id);

  return (
    <div className="bg-white py-7 lg:px-4 mx-5 lg:mx-14 flex flex-col w-full h-full">
      <BackButton/>
      <div className="flex-grow">
        <div className="flex justify-between items-center pb-3">
          <div className="relative">
            <img
              src={character.image}
              alt={character.name} 
              className="w-[75px] h-[75px] rounded-full"
            />
            <div className="bg-white rounded-full bottom-[0px] -right-2 absolute" onClick={() => toggleFavorite(id)}>
              <FavoriteButton isFavorite={isCharacterFavorite}/>
            </div>
          </div>
          <DeleteCharacterButton characterId={id} />
        </div>
        <h1 className="text-2xl mb-7">{character.name}</h1>
        <CharacterDetails character={character}/>
      </div>

      <div className="mt-auto">
        <CommentsSection key={id}/>
      </div>
    </div>
  );
};