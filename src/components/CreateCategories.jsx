import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import toast from "react-hot-toast";
import { FaSquarePlus } from "react-icons/fa6";

function CreateCategories() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    categories,
    setCategories,
  } = useCategories();
  const [open, setOpen] = useState(false);
  const handleAddNewCategory = () => {
    // Validate the 'title' field; if empty, display a warning toast notification
    if (!title)
      return toast("Please fill out Title field.", {
        icon: "🙄",
        className: "warningToast",
      });

    // Create a new category object with 'title' and 'description' properties
    const addNewCategory = {
      title,
      description,
    };

    // Check if the new category already exists in the categories array
    const exists = categories.some(
      category => category.title === addNewCategory.title
    );

    if (!exists) {
      // If the category does not exist, add it to the categories array
      setCategories(prev => [...prev, addNewCategory]);
      toast.success("The Category added 😊");
      setTitle(""); // Clear the title input field
      setDescription(""); // Clear the description input field
    } else {
      // If the category already exists, show an error message
      toast.error("The Category already Exists!! 😳");
    }
  };
  return (
    <div>
      {/* Title Category */}
      <h3
        onClick={() => setOpen(true)}
        className={`flex items-center gap-x-2 font-semibold cursor-pointer ${
          open
            ? "text-slate-800 dark:text-slate-300 text-xl font-bold mb-3"
            : "text-slate-600 text-lg mb-4"
        }`}>
        <span>Add new Category</span>
        <FaSquarePlus />
      </h3>
      {/* Form Category */}
      <div>
        {open && (
          <FormCategory>
            <FormTitle title={title} setTitle={setTitle} />
            <FormDescription
              description={description}
              setDescription={setDescription}
            />
            <FormButtons
              title={title}
              handleAddNewCategory={handleAddNewCategory}
              setOpen={setOpen}
            />
          </FormCategory>
        )}
      </div>
    </div>
  );
}
export default CreateCategories;

function FormCategory({ children }) {
  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-y-5 bg-white dark:bg-slate-700 p-4 border border-slate-300 dark:border-none rounded-xl text-slate-400 mb-8"
      onSubmit={e => e.preventDefault()}>
      {children}
    </form>
  );
}
function FormTitle({ title, setTitle }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label
        className="text-slate-500 dark:text-slate-400"
        htmlFor="category-title">
        Title
      </label>
      <input
        className="formInput"
        autoFocus={true}
        type="text"
        id="category-title"
        name="category-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter Your Category Name"
      />
    </div>
  );
}
function FormDescription({ description, setDescription }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label
        className="text-slate-500 dark:text-slate-400"
        htmlFor="category-description">
        Description
      </label>
      <textarea
        className="formInput"
        type="text"
        id="category-description"
        name="category-description"
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter The Category Description ... (Optional)"></textarea>
    </div>
  );
}
function FormButtons({ handleAddNewCategory, setOpen }) {
  return (
    <div className="flex items-center gap-x-3 text-sm">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="formBtn relative flex items-center justify-center dark:bg-transparent bg-transparent py-2.5 text-slate-900 dark:text-slate-300 border dark:border-2 border-slate-900 dark:border-slate-600 transition-all duration-300">
        <span>Cancle</span>
        <span className="hidden md:inline-block">Are you Sure?! 🥺</span>
      </button>
      <button
        type="submit"
        onClick={handleAddNewCategory}
        className="formBtn py-2.5">
        Add Category
      </button>
    </div>
  );
}
