import { createContext, useContext, useState, ReactNode } from "react";
import { RightBarInternal } from "./RightBarInternal";

type RightBarContent = {
  title?: string;
  description?: string;
  footerSaveButton?: boolean;
  content?: ReactNode;
};

type RightBarContextType = {
  open: (content: RightBarContent) => void;
  close: () => void;
};

const RightBarContext = createContext<RightBarContextType | null>(null);

export const useRightBar = () => {
  const ctx = useContext(RightBarContext);
  if (!ctx) throw new Error("useRightBar must be used within RightBarProvider");
  return ctx;
};

export const RightBarProvider = ({ children }: { children: ReactNode }) => {
const [isOpen, setIsOpen] = useState(false);
const [content, setContent] = useState<RightBarContent | null>(null);

const open = (content: RightBarContent) => {
  setContent(content);
  setIsOpen(true);
};

const close = () => {
  setIsOpen(false);
};

  return (
    <RightBarContext.Provider value={{ open, close }}>
      {children}
<RightBarInternal
  open={isOpen}
  onOpenChange={(open) => {
    setIsOpen(open);
    if (!open) setTimeout(() => setContent(null), 300); // attendre la fin d'animation
  }}
  {...(content ?? {})}
/>
    </RightBarContext.Provider>
  );
};
