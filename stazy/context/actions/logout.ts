// src/context/actions/logout.ts
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { User } from "../../types/User";

export const createLogoutAction = (
  tokenStore: SimulatedTokenStore,
  setUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void
) => {
  return async (): Promise<void> => {
    try {
      const token = await tokenStore.getToken();
      if (token) {
        await tokenStore.clearAll();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless
      await tokenStore.clearAll();
      setUser(null);
      setIsAuthenticated(false);
    }
  };
};