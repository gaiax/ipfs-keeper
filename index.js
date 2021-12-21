const axios = require("axios");

class IPFSKeeper {
  constructor() {
    this.gateways = null;
    this.cids = [];
  }
  async init() {
    this.gateways = await this.getPublicGateways();
  }
  async getPublicGateways() {
    let response;
    try {
      response = await axios.get(
        "https://github.com/ipfs/public-gateway-checker/raw/master/gateways.json"
      )
    } catch(err) {
      return [];
    }
    return response.data;
  }
  async keep(cids) {
    const gateways = this.gateways;
    for (const cid of cids) {
      if (!(cid in this.cids)) {
        this.cids.push(cid);
      }
      const fs = [];
      for (const gateway of gateways) {
        const url = gateway.replace(":hash", cid);
        fs.push(access(url));
      }
      await Promise.all(fs);
    }
  }
  async cronKeep() {
    await this.keep(this.cids);
  }
}


module.exports = IPFSKeeper;
