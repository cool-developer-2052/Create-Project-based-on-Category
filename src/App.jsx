import { Toaster } from "react-hot-toast";
import "./App.css";
import AppLayout from "./components/AppLayout";
import ProductsProvider from "./context/ProductsProvider";
import CategoriesProvider from "./context/CategoriesProvider";

function App() {
  return (
    <ProductsProvider>
      <CategoriesProvider>
        <Toaster
          toastOptions={{
            className: "toaster",
          }}
        />
        <AppLayout />
      </CategoriesProvider>
    </ProductsProvider>
  );
}

export default App;
