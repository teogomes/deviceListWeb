import React, { useEffect, useState } from "react";
import { DARK_COLORS, LIGHT_COLORS, SIZES } from "../Constants/Theme";

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  // const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (value) => {
    setIsDark(value);
  };

  const theme = {
    toggleTheme,
    isDark,
    sizes: SIZES,
    colors: isDark ? DARK_COLORS : LIGHT_COLORS,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
