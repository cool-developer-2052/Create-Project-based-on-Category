import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import useLocalStorage from "../hooks/useLocalstorage";
import { useProducts } from "../hooks/useProducts";

const DEFAULT_THEME = "system";
function AppAside() {
  const { projects } = useProducts();
  const [openTheme, setOpenTheme] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, "btn-theme-switcher", () => setOpenTheme(false));
  const [theme, setTheme] = useLocalStorage("theme", DEFAULT_THEME);
  const [systemTheme, setSystemTheme] = useState(null);

  // Detect if the system is in dark mode or light mode and set the theme accordingly
  const detectedSystemTheme = useMemo(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return isDarkMode ? "dark" : "light";
  }, []);

  useEffect(() => {
    // Update the system theme state
    setSystemTheme(detectedSystemTheme);

    const applyTheme = themeToApply => {
      document.documentElement.classList.add(themeToApply);
      document.documentElement.classList.remove(
        themeToApply === "dark" ? "light" : "dark"
      );
    };

    // If the user-selected theme is "system", apply the system theme to the document
    if (theme === "system") {
      applyTheme(detectedSystemTheme);
    } else {
      // Otherwise, apply the user-selected theme
      applyTheme(theme);
    }
  }, [theme, detectedSystemTheme]);

  const changeTheme = selectedTheme => {
    if (selectedTheme === "system") {
      document.documentElement.classList.add(detectedSystemTheme);
      document.documentElement.classList.remove(
        detectedSystemTheme === "dark" ? "light" : "dark"
      );
    }
    setTheme(selectedTheme);
  };

  return (
    <aside className="flex flex-col items-center p-3 bg-custom-slate dark:bg-slate-700 border-b border-slate-800 dark:border-slate-500 text-slate-100 dark:text-slate-200 text-left md:text-center">
      <div className="relative flex flex-wrap items-center justify-between w-full lg:w-max lg:justify-center lg:gap-x-4">
        <h2 className="font-semibold text-[10px] sm:text-base md:text-lg lg:text-xl">
          Inventory App using tailwindcss & React.js.
        </h2>
        <div className="flex gap-x-3 md:gap-x-5 lg:gap-x-4 bg-lime-500 dark:bg-transparent p-1 rounded-3xl">
          <span className="flex items-center justify-center size-6 dark:size-7 md:size-7 bg-white dark:bg-slate-600 text-custom-slate dark:text-white border border-slate-700 dark:border-white rounded-full font-medium text-xs md:text-sm">
            {projects.length}
          </span>
          <ThemeBtn
            setOpenTheme={setOpenTheme}
            theme={theme}
            systemTheme={systemTheme}
          />
        </div>
        <ThemeDropdown
          ref={ref}
          openTheme={openTheme}
          theme={theme}
          onChangeTheme={changeTheme}
        />
      </div>
    </aside>
  );
}

export default AppAside;

function ThemeBtn({ setOpenTheme, theme, systemTheme }) {
  return (
    <button
      className="text-slate-800 dark:text-sky-500 mr-0.5"
      id="btn-theme-switcher"
      onClick={() => setOpenTheme(prev => !prev)}>
      {theme === "system" ? (
        systemTheme === "dark" ? (
          <BsMoonStars className="size-6" />
        ) : (
          <FiSun className="size-6" />
        )
      ) : theme === "dark" ? (
        <BsMoonStars className="size-6" />
      ) : (
        <FiSun className="size-6" />
      )}
    </button>
  );
}
const ThemeDropdown = forwardRef(function ThemeDropdown(props, ref) {
  const { openTheme, theme, onChangeTheme } = props;
  return (
    <div
      ref={ref}
      className={`lg:absolute -right-14 top-11 bg-white dark:bg-slate-800 lg:dark:bg-slate-900 w-full lg:w-40 mt-3 border-2 border-slate-800 dark:border-slate-700 rounded-lg ${
        !openTheme && "hidden"
      }`}>
      <div className="flex flex-col py-0.5">
        <button
          className={`flex gap-x-2 items-center hover:bg-custom-slate dark:hover:bg-slate-800 py-2 px-3 border-b border-slate-500 dark:border-slate-700 text-sm font-medium transition-all ${
            theme === "light"
              ? "dark:text-sky-500 text-emerald-600 hover:text-lime-500"
              : "dark:text-slate-300 text-slate-500 hover:text-slate-200 hover:border-b-transparent"
          }`}
          onClick={() => onChangeTheme("light")}
          data-theme="light">
          <FiSun className="size-4" />
          Light
        </button>
        <button
          className={`flex gap-x-2 items-center hover:bg-custom-slate dark:hover:bg-slate-800 py-2 px-3 border-b border-slate-500 dark:border-slate-700 text-sm font-medium transition-all  ${
            theme === "dark"
              ? "dark:text-sky-500 text-emerald-500"
              : "dark:text-slate-300 text-slate-500 hover:text-slate-200 hover:border-b-transparent"
          }`}
          onClick={() => onChangeTheme("dark")}
          data-theme="dark">
          <BsMoonStars className="size-4" />
          Dark
        </button>
        <button
          onClick={() => onChangeTheme("system")}
          data-theme="system"
          className={`flex gap-x-2 items-center hover:bg-custom-slate dark:hover:bg-slate-800 py-2 px-3 border-b border-slate-500 dark:border-slate-700 text-sm font-medium transition-all ${
            theme === "system"
              ? "dark:text-sky-500 text-emerald-600 hover:text-lime-500"
              : "dark:text-slate-300 text-slate-500 hover:text-slate-200 hover:border-b-transparent"
          }`}>
          <HiMiniComputerDesktop className="size-4" />
          System
        </button>
      </div>
    </div>
  );
});
