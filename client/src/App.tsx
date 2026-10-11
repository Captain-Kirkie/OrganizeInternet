import { Route, Routes } from "react-router";
import { CategoryPage } from "./pages/CategoryPage";
import { LinksPage } from "./pages/LinksPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LinksPage />} />
      <Route path="/categories/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}
