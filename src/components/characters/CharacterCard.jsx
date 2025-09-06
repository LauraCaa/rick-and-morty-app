import { useNavigate } from "react-router-dom";
import CommentsSection from "../comments/CommentsSection";
import FavoriteButton from "../ui/FavoriteButton";
import DeleteCharacter from "./DeleteCharacterButton";


export default function CharacterCard() {
  const navigate = useNavigate();
  return (
    <div className="bg-white py-7 px-4 md:mx-14 flex flex-col h-full">
      <button className="md:hidden mb-10" onClick={() => navigate("/")}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 15L1 8M1 8L8 1M1 8L19 8" stroke="#8054C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
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
        <div className="mt-auto">
        <CommentsSection />
      </div>
    </div>
  );
}
