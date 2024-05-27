const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "032248680cfccf852fdde25390b21ee6a01f6101e81f630822b367a3dad696a1f8": { balance: 100 , privateKey: "ec0cc29fede8d00dc6de051d5856a8b4e5e8d5b9bdc2ab5416e296ac8cbf6f7e" },
  "039ea767ad67200bad891557d19c7f573f16a1aea50123081bee9af735275ba9ca": { balance: 60 , privateKey: "9f1c4844c42fc874b6f3eb733af0b8ef7b80365387289658b672fa3d183c1e35" },
  "0358a050bfe432cac33d3934734e9e024ef6e6075144fb6bbec2289f6bb611a3eb": { balance: 30 , privateKey: "7428d66ff2d6b34b5aee4d326c5cf11df087d48cb8f1828255b495ba38d72f43" },
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address].balance || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender].balance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender].balance -= amount;
    balances[recipient].balance += amount;
    res.send({ balance: balances[sender].balance });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address] || !balances[address].balance) {
    balances[address].balance = 0;
  }
}
