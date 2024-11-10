import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesProvider";

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined)
    throw new Error("The useCategories is call outside of CategoriesContext");
  return context;
}
