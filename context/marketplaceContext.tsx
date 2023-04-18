import { useContext, createContext, useState } from "react";

const MarketplaceContext = createContext<any>(null);

const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [collAddress, setCollAddress] = useState("");

  return (
    <MarketplaceContext.Provider
      value={{
        collAddress,
        setCollAddress,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider;

export const MarketContext = () => {
  return useContext(MarketplaceContext);
};
