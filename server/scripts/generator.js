const secp = require("ethereum-cryptography/secp256k1");
const { toHex , utf8ToBytes ,hexToBytes} = require("ethereum-cryptography/utils");


var privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key is :', toHex(privateKey));

const publickKey = secp.secp256k1.getPublicKey(privateKey);
console.log(toHex(publickKey));

const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";

var sign = secp.secp256k1.sign(messageHash, privateKey);

console.log(secp.secp256k1.verify(sign, messageHash, publickKey));









