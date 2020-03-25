import { TYPES, update } from "./actions";
import { PreferenceState, PreferenceStateUpdateProps } from "./types";

const LOCAL_STORAGE_KEY_THEME = "zilswap:theme";
const VALID_THEMES = ["dark", "light"];

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedThemePreference = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
const initialTheme = savedThemePreference || (prefersDarkMode ? "dark" : "light");

const initial_state: PreferenceState = {
  theme: VALID_THEMES.includes(initialTheme) ? initialTheme : "light",
};

const checkToSaveThemePreference = (currentTheme: string, updatePayload: PreferenceStateUpdateProps) => {
  const { theme } = updatePayload;
  if (!theme) return;

  if (theme !== currentTheme && VALID_THEMES.includes(theme))
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme);
};

const reducer = (state: PreferenceState = initial_state, actions: any) => {
  switch (actions.type) {
    case TYPES.INIT:
      return {
        ...state,
        ...actions.payload,
      };
    case TYPES.UPDATE:
      checkToSaveThemePreference(state.theme, actions.payload);
      return {
        ...state,
        ...actions.payload,
      };
    default:
      return state;
  };
}

export default reducer;
