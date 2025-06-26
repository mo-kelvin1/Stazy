// src/context/AuthContext.tsx
import { createContext } from "react";
import { AuthContextType } from "../types/AuthContextType";

export const AuthContext = createContext<AuthContextType | null>(null);