import { WalletIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const HeroConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="hover:text-white text-sm border border-[#feb019] text-[#feb019] hover:bg-gradient-to-r from-[#feb019] via-[#e39601] to-[#f59292] px-8 py-4 rounded-full">
                         CONNECT WALLET
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className="text-red-500" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div  className="hover:text-white text-sm border border-[#feb019] text-[#feb019] hover:bg-gradient-to-r from-[#feb019] via-[#e39601] to-[#f59292] px-8 py-4 gap-4 rounded-full flex flex-row cursor-pointer">
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                        className='flex items-center justify-center'
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className='w-6'
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  <button className="font-semibold text-lg" onClick={openAccountModal} type="button">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
