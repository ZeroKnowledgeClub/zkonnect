"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

// Define the context properties
interface DisplayNameContextProps {
  displayName: string | null;
  setDisplayName: (displayName: string) => void;
}

const DisplayNameContext = createContext<DisplayNameContextProps | undefined>(
  undefined
);
interface Props {
  children: ReactNode;
}
const DisplayNameProvider: React.FC<Props> = ({ children }) => {
  const [displayName, setDisplayName] = useState<string | null>(null);

  return (
    <>
      <DisplayNameContext.Provider value={{ displayName, setDisplayName }}>
        <div>{children}</div>
      </DisplayNameContext.Provider>
    </>
  );
};
// Custom hook to use the display name context
const useDisplayName = () => {
  const context = useContext(DisplayNameContext);
  if (context === undefined) {
    throw new Error("useDisplayName must be used within a DisplayNameProvider");
  }
  return context;
};

export { DisplayNameProvider, useDisplayName };
