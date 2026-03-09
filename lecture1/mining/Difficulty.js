const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    const block = { id: blocks.length };
    block.transactions = mempool.splice(0, MAX_TRANSACTIONS);

    block.nonce = 0;
    let hashValue;
    do {
        hashValue = SHA256(JSON.stringify(block));
        if (BigInt(`0x${hashValue}`) < TARGET_DIFFICULTY)
            break;
        block.nonce++;
    } while (true);

    block.hash = SHA256(JSON.stringify(block)).toString();
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};