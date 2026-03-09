// Block.js
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.data = data;
    }

    toHash() {
        return SHA256(this.data + this.previousHash).toString();
    }
}

module.exports = Block;


// Blockchain.js
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block('Genesis Block')];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }
}

module.exports = Blockchain;