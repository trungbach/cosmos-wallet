import { useManager } from "@cosmos-kit/react";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ChainOption, ChooseChain, handleSelectChainDropdown, ConnectWalletButton } from ".";
import { ChainName } from "@cosmos-kit/core";
import { WalletCardSection } from "./card";
// import Connect from "./react/connect";
import ConnectMultipleWallet from "./react/connect-multiple-chain";
import Connect from "./react/connect";

export const WalletSection = () => {
  const [chainName, setChainName] = useState<ChainName | undefined>("oraichain");
  const { chainRecords, getChainLogo } = useManager();

  const chainOptions = useMemo(
    () =>
      chainRecords.map((chainRecord) => {
        return {
          chainName: chainRecord?.name,
          label: chainRecord?.chain.pretty_name,
          value: chainRecord?.name,
          icon: getChainLogo(chainRecord.name),
        };
      }),
    [chainRecords, getChainLogo]
  );

  useEffect(() => {
    setChainName(window.localStorage.getItem("selected-chain") || "oraichain");
  }, []);

  const onChainChange: handleSelectChainDropdown = async (selectedValue: ChainOption | null) => {
    setChainName(selectedValue?.chainName);
    if (selectedValue?.chainName) {
      window?.localStorage.setItem("selected-chain", selectedValue?.chainName);
    } else {
      window?.localStorage.removeItem("selected-chain");
    }
  };

  const chooseChain = (
    <ChooseChain chainName={chainName} chainInfos={chainOptions} onChange={onChainChange} />
  );

  return (
    <Center py={2}>
      <Grid
        w="full"
        maxW="sm"
        templateColumns="1fr"
        rowGap={4}
        alignItems="center"
        justifyContent="center"
      >
        {/* <GridItem>{chooseChain}</GridItem> */}
        {/* {chainName ? (
          <WalletCardSection chainName={chainName}></WalletCardSection>
        ) : (
          <ConnectWalletButton buttonText={"Connect Wallet"} isDisabled />
        )} */}

        <Connect />
        {/* <ConnectMultipleWallet /> */}
      </Grid>
    </Center>
  );
};
