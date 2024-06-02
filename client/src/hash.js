import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message) {
   var bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

export default hashMessage;