import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
type OverlayContextType = {
  show: (content: ReactNode) => void;
  hide: () => void;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const show = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
    setContent(null);
  };

  return (
    <OverlayContext.Provider value={{ show, hide }}>
      {children}

      {isVisible && (
        <div className=" fixed inset-0  w-screen h-screen bg-[#21254B4D] z-20 flex items-center justify-center">
          {content}
        </div>
      )}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within OverlayProvider");
  }
  return context;
};
