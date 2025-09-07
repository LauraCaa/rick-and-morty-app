import { Link } from "react-router-dom";
import CharacterItem from "./CharacterItem";

export default function FavoriteCharacterList({ characters = [] }) {

  if (characters.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="starred-list-heading" className="space-y-2 mx-4 mb-8">
      <h2 id="starred-list-heading" className="text-xs text-gray-500 tracking-wide mx-4 py-3 font-medium">
        FAVORITE CHARACTERS ({characters.length})
      </h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id} className="rounded-lg md:hover:bg-primary-100 cursor-pointer px-4">
            <Link to={`/character/${character.id}`}>
              <CharacterItem character={character} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}