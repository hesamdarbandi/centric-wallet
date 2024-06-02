import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [trancId, setTranc] = useState(1);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setTranc={setTranc}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} trancId={trancId} />
    </div>
  );
}

export default App;
