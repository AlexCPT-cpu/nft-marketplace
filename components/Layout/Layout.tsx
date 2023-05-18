import { LayoutProps } from "@/types/types";
import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useEffect, useRef } from "react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";


const Layout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter()
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { user } = useUser(address as string);
  const recoveredAddress = useRef<string>();
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
      router.push("/createprofile");
    },
  });

  useEffect(() => {
    if(address) {
    if (user) {
      console.log("user found");
    } else {
      console.log("no user ")
      const message = 'Sign this message to verify your account'
      //signMessage({ message });
    }
  } else {
    console.log('connect wallet')
  }
  }, [address, user, chain?.id, signMessage]);
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
