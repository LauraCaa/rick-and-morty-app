import CommentsSection from "../comments/CommentsSection";
import FavoriteButton from "../ui/FavoriteButton";
import DeleteCharacter from "./DeleteCharacterButton";

export default function CharacterCard() {
  return (
    <div className="bg-white py-7 px-4 md:mx-14 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-between items-center pb-3">
          <div className="relative">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/6.jpeg"
              alt="Character Avatar"
              className="w-[75px] h-[75px] rounded-full"
            />
            <div className="bg-white rounded-full bottom-[0px] -right-2 absolute">
              <FavoriteButton initialFavorite={true} />
            </div>
          </div>
          <DeleteCharacter />
        </div>

        <div className="mb-7">
          <h1 className="text-2xl">Abadango Cluster Princess</h1>
        </div>

        <ul>
          <li className="pb-4 mb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-sm">Specie</h3>
            <p className="text-gray-400">Alien</p>
          </li>
          <li className="pb-4 mb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-sm">Status</h3>
            <p className="text-gray-400">Alive</p>
          </li>
          <li className="pb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-sm">Occupation</h3>
            <p className="text-gray-400">Princess</p>
          </li>
        </ul>
      </div>

      <CommentsSection />
    </div>
  );
}
