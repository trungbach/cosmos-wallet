import { useChain, useWallet, useChainWallet } from "@cosmos-kit/react";
import { useChains } from "@cosmos-kit/react-lite";
import { Box, GridItem, Icon, Stack, useColorModeValue } from "@chakra-ui/react";
import { MouseEventHandler, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import {
  Astronaut,
  Error,
  Connected,
  ConnectedUserInfo,
  Connecting,
  ConnectStatusWarn,
  Disconnected,
  NotExist,
  Rejected,
  RejectedWarn,
  WalletConnectComponent,
} from ".";

export const WalletCardSection = ({ chainName }: { chainName: string }) => {
  const { connect, openView, status, username, address, message, wallet } = useChain(chainName);

  const res = useChains(["oraichain", "cosmoshub", "osmosis", "injective", "noble"]);

  const chainWallet = useChainWallet("oraichain", "keplr-extension");
  // const networkWallet = useNetworkWallet("cosmos", "keplr-extension");

  console.log({ chainWallet });

  useEffect(() => {
    Object.entries(res).map(([key, value]) => {
      console.log({ value });
    });
  }, [res]);

  // Eventse
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    console.log("connect");
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    console.log("open_view");
    e.preventDefault();
    openView();
  };

  console.log({ status });

  // Components
  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={status}
      disconnect={<Disconnected buttonText="Connect Wallet" onClick={onClickConnect} />}
      connecting={<Connecting />}
      connected={<Connected buttonText={"My Wallet"} onClick={onClickOpenView} />}
      rejected={<Rejected buttonText="Reconnect" onClick={onClickConnect} />}
      error={<Error buttonText="Change Wallet" onClick={onClickOpenView} />}
      notExist={<NotExist buttonText="Install Wallet" onClick={onClickOpenView} />}
    />
  );

  const connectWalletWarn = (
    <ConnectStatusWarn
      walletStatus={status}
      rejected={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
      error={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
    />
  );

  const userInfo = username && <ConnectedUserInfo username={username} icon={<Astronaut />} />;
  return (
    <>
      {connectWalletWarn && <GridItem>{connectWalletWarn}</GridItem>}
      <GridItem px={6}>
        <Stack
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          bg={useColorModeValue("white", "blackAlpha.400")}
          boxShadow={useColorModeValue(
            "0 0 2px #dfdfdf, 0 0 6px -2px #d3d3d3",
            "0 0 2px #363636, 0 0 8px -2px #4f4f4f"
          )}
          spacing={4}
          px={4}
          py={{ base: 6, md: 12 }}
        >
          {userInfo}
          <Box w="full" maxW={{ base: 52, md: 64 }}>
            {connectWalletButton}
          </Box>
        </Stack>
      </GridItem>
    </>
  );
};
