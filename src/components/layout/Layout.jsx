import { Outlet, useLocation } from "react-router-dom";
import Header from "../ui/Header";
import StarredCharacterList from "../characters/StarredCharacterList";
import CharacterList from "../characters/CharacterList";

export default function Layout() {
  const location = useLocation();
  const isCharacterPage = location.pathname.startsWith("/character/");

  return (
    <div className="h-screen bg-white text-gray-800 flex flex-col md:flex-row">
      <aside className="hidden md:flex w-96 bg-[#fafafa] px-1 py-10 flex-shrink-0 overflow-y-auto flex-col">
        <Header />
        <StarredCharacterList />
        <CharacterList />
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-1">
        <div className={`md:hidden ${isCharacterPage ? 'hidden' : 'block'}`}>
          <Header isMobile={true} />
          <StarredCharacterList />
          <CharacterList />
        </div>
        
        <div className={`${isCharacterPage ? 'block' : 'hidden'} md:block h-full`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}