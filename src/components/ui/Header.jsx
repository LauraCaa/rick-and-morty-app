// src/components/Header.jsx
import SearchBar from "../search/SearchBar";

export default function Header({ isMobile = false }) {
  return (
    <div className={isMobile ? "bg-white p-4 mx-3" : " px-3"}>
      <h1 className="py-3 text-2xl font-bold text-gray-800"> Rick and Morty List</h1>
      <div className={isMobile ? "mt-4" : ""}>
        <SearchBar />
      </div>
    </div>
  );
}
