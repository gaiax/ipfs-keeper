# ipfs-keep
This is a tool for keeping data on IPFS network.

### Requirements
* Node.js
* npm

### Usage
**install**
```bash
npm install --save gaiax/ipfs-keeper
```

**keep**
```javascript
const Keeper = require("ipfs-keeper");

const keeper = new Keeper();

await keeper.init();
await keeper.keep([
  "QmSFtLtBMgzXo3Jvi2Lsu5C4hekkuHPdpUVcgRBoEwkfjr",
  "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o",
]);

await keeper.cronKeep();
```

### License
MIT License
