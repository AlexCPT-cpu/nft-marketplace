import { LayoutProps } from "@/types/types";
import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
