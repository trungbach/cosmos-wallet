import { useChains } from "@cosmos-kit/react-lite";
import { useEffect } from "react";

export default function Connect() {
  const chains = useChains(["cosmoshub", "osmosis", "stargaze", "oraichain", "akash"]);
  const connected = Object.values(chains).every((chain) => chain.isWalletConnected);
  const { connect, openView } = chains.oraichain;

  // Notice: calling chains.chainName.connect() will connect to all 5 chains above.

  //   useEffect(() => {
  //     // chains?.oraichain?.connect();
  //     chains?.chainName?.connect();
  //   }, [chains]);
  return (
    <div className="space-y-2">
      <button onClick={() => (connected ? openView() : connect())}>
        {connected ? "Disconnect" : "Connect"}
      </button>
      <table className="table-fixed font-mono">
        <thead>
          <tr>
            <th className="w-80">Code</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>chains.cosmoshub.address: </td>
            <td>{chains.cosmoshub.address}</td>
          </tr>
          <tr>
            <td>chains.osmosis.addres: </td>
            <td>{chains.osmosis.address}</td>
          </tr>
          <tr>
            <td>chains.stargaze.addres: </td>
            <td>{chains.stargaze.address}</td>
          </tr>
          <tr>
            <td>chains.oraichain.address: </td>
            <td>{chains.oraichain.address}</td>
          </tr>
          <tr>
            <td>chains.akash.address: </td>
            <td>{chains.akash.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
