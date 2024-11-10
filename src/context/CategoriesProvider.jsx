import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalstorage";

export const CategoriesContext = createContext();

export default function CategoriesProvider({ children }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useLocalStorage("categories", []);

  return (
    <CategoriesContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        categories,
        setCategories,
      }}>
      {children}
    </CategoriesContext.Provider>
  );
}
