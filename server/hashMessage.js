const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
   var bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

module.exports = hashMessage;