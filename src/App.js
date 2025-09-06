import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CharacterCard from "./components/characters/CharacterCard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CharacterCard />} />
        <Route path="character/:id" element={<CharacterCard />} />
      </Route>
    </Routes>
  );
}
