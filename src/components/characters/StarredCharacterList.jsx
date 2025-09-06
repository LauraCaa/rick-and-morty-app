import CharacterItem from "./CharacterItem";

export default function StarredCharactersList() {
  return (
    <section aria-labelledby="character-list-heading" className="space-y-2 mx-4">
          <h2
            id="character-list-heading"
            className="text-xs text-gray-500 tracking-wide mx-4 py-3 font-medium "
          >
            STARRED CHARACTERS (2)
          </h2>
    
          <ul>
            <li className="rounded-lg md:hover:bg-primary-100 cursor-pointer px-4">
              <CharacterItem />
            </li>
            <li className="rounded-lg md:hover:bg-primary-100 cursor-pointer px-4">
              <CharacterItem />
            </li>
          </ul>
        </section>
  );
}
