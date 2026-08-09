import { createContext, useContext, useState, type ReactNode } from "react";
import type { Opportunity } from "../types";

interface ModalContextValue {
  active: Opportunity | null;
  open: (opp: Opportunity) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Opportunity | null>(null);
  return (
    <ModalContext.Provider value={{ active, open: setActive, close: () => setActive(null) }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
