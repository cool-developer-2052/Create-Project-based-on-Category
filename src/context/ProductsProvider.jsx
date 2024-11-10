import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalstorage";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [projects, setProjects] = useLocalStorage("projects", []);
  return (
    <ProductsContext.Provider
      value={{
        projects,
        setProjects,
      }}>
      {children}
    </ProductsContext.Provider>
  );
}
