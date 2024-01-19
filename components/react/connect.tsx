// @ts-ignore
import { Button } from "@chakra-ui/react";
import { useChainWallet, useWalletClient, useManager, useWallet } from "@cosmos-kit/react";
import { useChains } from "@cosmos-kit/react-lite";
import { useEffect } from "react";

export default function Connect() {
  const chains = useChains(["cosmoshub", "osmosis", "oraichain"]);
  const connected = Object.values(chains).every((chain) => chain.isWalletConnected);
  const { connect, openView, disconnect, isWalletConnected } = chains.oraichain;

  // const chainWallet = useChainWallet("oraichain", "keplr-extension");
  // useEffect(() => {
  //   if (chainWallet) {
  //     chainWallet.connect();
  //   }
  // }, []);

  // const wallet = useWallet();
  // useEffect(() => {
  //   if (wallet) {
  //     console.log("wallet: ", wallet.mainWallet?.walletPrettyName);
  //     console.log("wallet status: ", wallet.status);
  //   }
  // }, [wallet]);

  // // use client of current wallet, if not it is undef,
  // // but we use multiple wallet with multiple chain so this hook can not use
  // const walletClient = useWalletClient();
  // useEffect(() => {
  //   if (walletClient) {
  //   }
  // }, [walletClient]);

  // const { walletRepos } = useManager();
  // useEffect(() => {
  //   const repo = walletRepos.find((item) => item.chainName === "oraichain");
  //   console.log({ repo });
  //   if (repo) {
  //     repo.connect("owallet-extension");
  //   }
  // }, [walletRepos]);

  console.log({ chains });

  return (
    <div className="space-y-2">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <Button onClick={() => (connected ? disconnect() : connect())}>
          {connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
      {isWalletConnected ? (
        <table className="table-fixed font-mono">
          <thead>
            <tr>
              <th className="w-80">Code</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cosmoshub.address: </td>
              <td>{chains.cosmoshub.address}</td>
            </tr>
            <tr>
              <td>osmosis.addres: </td>
              <td>{chains.osmosis.address}</td>
            </tr>

            <tr>
              <td>oraichain.address: </td>
              <td>{chains.oraichain.address}</td>
            </tr>
            {/* <tr>
            <td>akash.address: </td>
            <td>{chains.akash.address}</td>
          </tr> */}
          </tbody>
        </table>
      ) : (
        "not connected"
      )}
    </div>
  );
}
