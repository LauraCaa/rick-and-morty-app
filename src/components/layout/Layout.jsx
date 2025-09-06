import { Outlet, useLocation } from "react-router-dom";
import StarredCharacterList from "../characters/StarredCharacterList";
import CharacterList from "../characters/CharacterList";
import Header from "../ui/Header";

export default function Layout() {
  const location = useLocation();
  const isCharacterPage = location.pathname.startsWith("/character/");

  return (
    <div className="h-screen bg-white text-gray-800 flex flex-col md:flex-row">
      <aside className={`hidden md:flex w-96 bg-[#fafafa] px-1 py-10 flex-shrink-0 overflow-y-auto flex-col`}>
        <Header />
        <StarredCharacterList />
        <CharacterList />
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden py-6 p-4">
        <div className="md:hidden flex flex-col">
          {!isCharacterPage && (
            <>
              <Header isMobile={true} />
              <StarredCharacterList />
              <CharacterList />
            </>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
