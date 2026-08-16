import { createContext } from "react";

// The cart context itself lives here (no component) so that React Fast
// Refresh is happy with the file structure — see .oxlintrc.json.
export const CartContext = createContext();
