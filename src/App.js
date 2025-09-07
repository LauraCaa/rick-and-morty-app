import { Routes, Route } from "react-router-dom";
import AppApolloProvider from "./context/ApolloClientProvider";
import CharacterView from "./components/characters/lists/CharacterView";
import CharacterCard from "./components/characters/card/CharacterCard";
import DeletedCharactersProvider from "./context/DeletedCharactersContext";
import FavoritesProvider from "./context/FavoritesContext";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <AppApolloProvider>
      <FavoritesProvider>
        <DeletedCharactersProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<CharacterView/>}/>
                <Route path="character/:id" element={<CharacterCard/>}/>
            </Route>
          </Routes>
        </DeletedCharactersProvider>
      </FavoritesProvider>
    </AppApolloProvider>
  );
};