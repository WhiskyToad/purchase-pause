import { darkTheme, lightTheme } from "@/theme/theme";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const contextValue = useMemo(() => {
    return { theme: theme === "light" ? lightTheme : darkTheme, toggleTheme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
