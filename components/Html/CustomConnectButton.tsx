import { WalletIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export const CustomConnectButton = () => {
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
                  <button onClick={openConnectModal} type="button" className="rounded-full p-2 bg-gradient-to-r cursor-pointer from-yellow-300 to-orange-400">
                    <div className="hidden lg:block">
                      <WalletIcon className="w-6 stroke-white" />
                        </div>
                        <div className="px-3 block lg:hidden whitespace-nowrap">
                          Connect Wallet
                        </div>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className="text-red-500 whitespace-nowrap border p-2" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="rounded-full p-2 px-4 bg-gradient-to-r cursor-pointer from-yellow-300 to-orange-400" style={{ display: "flex", gap: 12 }}>
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
                  <button className="font-semibold text-lg whitespace-nowrap" onClick={openAccountModal} type="button">
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
