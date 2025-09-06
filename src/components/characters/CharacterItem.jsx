import FavoriteButton from "../ui/FavoriteButton";

export default function CharacterItem() {
  return (
    <div className="flex items-center justify-between py-4  md:hover:border-primary-100 border-t-2 border-gray-100 ">
      <div className="flex items-center gap-3">
        <img
          src="https://rickandmortyapi.com/api/character/avatar/6.jpeg"
          alt="Abadango Cluster Princess"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="semibold-text text-gray-800">Abadango Cluster Princess</p>
          <p className="text-sm text-gray-400">Alien</p>
        </div>
      </div>
      <FavoriteButton />
    </div>
  );
}
