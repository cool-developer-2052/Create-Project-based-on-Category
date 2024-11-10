import { useCategories } from "../hooks/useCategories";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts";

function CreateProducts() {
  const { categories } = useCategories();
  const { projects, setProjects } = useProducts();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Product form validation
    if (!title) {
      return toast("Please fill out the Title field.", {
        icon: "🙄",
        className: "warningToast",
      });
    }

    if (quantity <= 0) {
      return toast("Please fill out the Quantity field.", {
        icon: "🙄",
        className: "warningToast",
      });
    }

    if (!category || category === "DEFAULT") {
      return toast("Please select a Category.", {
        icon: "🙄",
        className: "warningToast",
      });
    }

    // Check if the product already exists in the specified category
    const exists = projects.some(
      project => project.title === title && project.category === category
    );

    // Create a new Product object
    const addNewProduct = {
      title,
      quantity,
      category,
    };

    // Add the new product if it doesn't already exist
    if (exists) {
      toast.error("The product already exists in this category!! 😳");
    } else {
      setProjects(prev => [...prev, addNewProduct]);
      toast.success("The Product Added 😊");
      setTitle("");
      setQuantity(0);
      setCategory("");
    }
  };

  return (
    <div>
      <h3 className="text-slate-800 dark:text-slate-300 text-xl font-bold mb-3">
        Add New Product
      </h3>
      <FormProduct onSubmit={handleSubmit}>
        <FormTitle title={title} setTitle={setTitle} />
        <FormQuantity quantity={quantity} setQuantity={setQuantity} />
        <FormCategory
          categories={categories}
          setCategory={setCategory}
          category={category}
        />
      </FormProduct>
    </div>
  );
}
export default CreateProducts;

function FormProduct({ onSubmit, children }) {
  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-y-5 bg-white dark:bg-slate-700 p-4 text-slate-400  border border-slate-300 dark:border-none rounded-xl mb-8"
      onSubmit={onSubmit}>
      {children}
      <div className="flex items-center justify-center">
        <button className="formBtn" type="submit">
          Add new Product
        </button>
      </div>
    </form>
  );
}
function FormTitle({ title, setTitle }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label
        className="text-slate-500 dark:text-slate-400"
        htmlFor="product-title">
        Title
      </label>
      <input
        className="formInput"
        type="text"
        id="product-title"
        name="product-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter Your Project Name"
      />
    </div>
  );
}
function FormQuantity({ quantity, setQuantity }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label
        className="text-slate-500 dark:text-slate-400"
        htmlFor="product-quantity">
        Quantity
      </label>
      <input
        className="formInput"
        type="number"
        id="product-quantity"
        name="product-quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
    </div>
  );
}
function FormCategory({ categories, setCategory, category }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label
        className="text-slate-500 dark:text-slate-400"
        htmlFor="product-category">
        Category
      </label>
      <select
        className="formInput dark:bg-slate-700 dark:text-white cursor-pointer"
        name="product-category"
        id="product-category"
        onChange={e => setCategory(e.target.value)}
        value={category}>
        <option value="">Select a Category</option>
        {categories &&
          categories.map((category, index) => (
            <option
              className="dark:bg-slate-800 dark:text-slate-200 text-slate-700"
              key={index}>
              {category.title}
            </option>
          ))}
      </select>
    </div>
  );
}
