import { Link } from "react-router-dom";
import CharacterItem from "./CharacterItem";

export default function OtherCharacterList({ characters = [] }) {  
  if (characters.length === 0) {
    return <p className="text-gray-500 text-center p-4">No other characters found.</p>;
  }

  return (
    <section aria-labelledby="character-list-heading" className="space-y-2 mx-4">
      <h3 id="character-list-heading" className="text-xs text-gray-500 tracking-wide mx-4 py-3 font-medium">
        CHARACTERS ({characters.length})
      </h3>
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