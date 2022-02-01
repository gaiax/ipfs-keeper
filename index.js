const axios = require("axios");
function access(url) {
  return new Promise((resolve, reject) => {
    axios.get(
      url,
      {
        timeout: 20000
      }
    ).then((response) => {
      console.log("✅ " + url);
      resolve();
    }).catch(() => {
      console.log("❌ " + url);
      resolve();
    });
  });
}
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
