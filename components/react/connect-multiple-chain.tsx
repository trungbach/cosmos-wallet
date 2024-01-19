import { useWallet, useWalletClient } from "@cosmos-kit/react";
import { useEffect, useState } from "react";
import { chains, assets } from "chain-registry";
import { convertChain } from "@cosmos-kit/core";
import { Button } from "@chakra-ui/react";

export default function ConnectMultipleWallet() {
  const { status, client } = useWalletClient("keplr-extension"); // or comostation-extension, leap-extension, etc.
  const [cosmosAddress, setCosmosAddress] = useState({});

  const keplrWallet = useWallet("keplr-extension");
  useEffect(() => {
    if (keplrWallet.mainWallet) {
      const chainRecords = chains.map((chain) => {
        const converted = convertChain(chain, assets);
        return converted;
      });
      keplrWallet.mainWallet.setChains(chainRecords);
      const chainWalletList = keplrWallet.mainWallet.getChainWalletList();
      console.log({ chainWalletList });
    }
  }, [keplrWallet]);

  const handleConnectCosmos = async () => {
    console.log("connect", status, client);
    if (status === "Done" && client) {
      await client.enable?.(["cosmoshub-4", "osmosis-1", "noble-1"]);
      await client.connect?.(["cosmoshub-4", "osmosis-1", "noble-1"]);
    }
  };

  const handleDisconnectCosmos = async () => {
    console.log("disconnect", status, client);
    if (status === "Done" && client) {
      await client.disconnect?.();
    }
  };

  useEffect(() => {
    if (client) {
      client.getAccount("cosmoshub-4").then((acc) => console.log({ acc }));
    }
  }, [client]);

  // const getAddr = async () => {
  //   const osmosisAddr = await client?.getAccount("osmosis-1");
  //   const cosmosAddr = await client?.getAccount("cosmoshub-4");
  //   const nobleAddr = await client?.getAccount("noble-1");
  //   setCosmosAddress({
  //     osmosisAddr,
  //     cosmosAddr,
  //     nobleAddr,
  //   });
  // };

  console.log({ cosmosAddress });

  useEffect(() => {
    if (client) {
      // getAddr();
    }
  }, [client]);

  return (
    <div>
      <h1>Connect multiple wallet</h1>
      <Button onClick={() => handleConnectCosmos()}>Connect cosmos chains</Button>
      <Button onClick={() => handleDisconnectCosmos()}>Disconnect cosmos chains</Button>
    </div>
  );
}
