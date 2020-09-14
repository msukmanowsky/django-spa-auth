import { createContext } from "react";

import * as models from "./models";

export interface AppContextType {
  loading: boolean;
  user?: models.User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AppContext = createContext<Partial<AppContextType>>({
  loading: true,
});
