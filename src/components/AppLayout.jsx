import AppAside from "./AppAside";
import CreateCategories from "./CreateCategories";
import CreateProducts from "./CreateProducts";

function AppLayout() {
  return (
    <main>
      <AppAside />
      <section className="flex flex-col md:flex-row mt-5 px-4 md:px-8 lg:max-w-screen-xl mx-auto">
        <section className="basis-1/2">
          <CreateCategories />
          <CreateProducts />
          <section className="basis-1/2"></section>
        </section>
      </section>
    </main>
  );
}

export default AppLayout;
