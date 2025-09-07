import FavoriteButton from "../../ui/FavoriteButton";
import { useFavorites } from "../../../context/FavoritesContext";

export default function CharacterItem({character}) {
  const { name = "Unknown", species = "Unknown", image, id } = character || {};
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCharacterFavorite = isFavorite(id);

  return (
    <div className="flex items-center justify-between py-4  md:hover:border-primary-100 border-t-2 border-gray-100 ">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="semibold-text text-gray-800">{name}</p>
          <p className="text-sm text-gray-400">{species}</p>
        </div>
      </div>
      <div onClick={() => toggleFavorite(id)}>
        <FavoriteButton isFavorite={isCharacterFavorite} />
      </div>
    </div>
  );
}
