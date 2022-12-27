import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectionButton = () => {
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
                  <button
                    style={{
                      color: "#5f17ffff",
                      fontSize: "18px"
                    }}
                    onClick={openConnectModal}
                    type="button"
                  >
                    connect wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    style={{
                      color: "#5f17ffff",
                      fontSize: "18px"
                    }}
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={openChainModal}
                    style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#5f17ffff',
                    fontSize: "18px"
                  }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 8,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <span style={{ fontSize: "18px" }}>{" | "}</span>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      color: "#5f17ffff",
                      fontSize: "18px"
                    }}
                  >
                    <span>Disconnect</span>
                    {/* {account.displayName} */}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
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
