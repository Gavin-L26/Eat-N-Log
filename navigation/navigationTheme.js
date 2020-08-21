import { DefaultTheme } from "@react-navigation/native";

import Colors from "../utils/colors";

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    card: Colors.secondary,
    text: Colors.Background,
    border: Colors.primary,
    background: Colors.Background,
  },
};

export default navigationTheme;
