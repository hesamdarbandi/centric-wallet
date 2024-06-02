import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils";
import hashMessage from "./hash";


function Transfer({ address, setBalance, trancId }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const balances = {
    "032248680cfccf852fdde25390b21ee6a01f6101e81f630822b367a3dad696a1f8": "ec0cc29fede8d00dc6de051d5856a8b4e5e8d5b9bdc2ab5416e296ac8cbf6f7e",
    "039ea767ad67200bad891557d19c7f573f16a1aea50123081bee9af735275ba9ca": "9f1c4844c42fc874b6f3eb733af0b8ef7b80365387289658b672fa3d183c1e35",
    "0358a050bfe432cac33d3934734e9e024ef6e6075144fb6bbec2289f6bb611a3eb": "7428d66ff2d6b34b5aee4d326c5cf11df087d48cb8f1828255b495ba38d72f43",
  };


  async function transfer(evt) {

    evt.preventDefault();

    if (address == "" || recipient == '') {
      alert("need both side of the address");
      return;
    }

    if(sendAmount <= 0){
      alert("enter valid amount");
      return;
    }


    if (!balances[address] || !balances[recipient]) {
      alert("the address does not register yet");
      return;
    }

    var amount = parseInt(sendAmount);
    const hash = hashMessage(JSON.stringify({ sender: address, recipient, amount }));
    var sign = secp256k1.sign(hash, balances[address])
 

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: amount,
        recipient,
        sign: sign.toCompactHex(),
        hashMsg: toHex(hash),
        trancId
      });
      setBalance(balance);

    } catch (ex) {
      alert(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
