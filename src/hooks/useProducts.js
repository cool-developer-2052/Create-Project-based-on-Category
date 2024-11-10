import { useContext } from "react";
import { ProductsContext } from "../context/ProductsProvider";

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("The useProducts is call outside of ProductsProvider");
  return context;
}
