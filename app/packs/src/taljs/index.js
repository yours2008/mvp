import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import TalentProtocol from "../abis/TalentProtocol.json";
import TalentProtocolFactory from "../abis/TalentProtocolFactory.json";

import Tal from "./Tal";
import TalentTokens from "./TalentTokens";

const TAL_ADDRESSES = {
  3: "0xbc4c1d9b3904f2f592edd595b45cdde09304bcf1", // ropsten
};
const LOCAL_TAL_ADDRESS = "0x96465668B947CC7c0FD39A3ad35320316B6CadF9"; // local fallback from ABIs

const TALENT_TOKENS_ADDRESSES = {
  3: "0x303c6209B50c157DB5f45A0D0079FC5BdDfaeb4E",
};
const LOCAL_TALENT_TOKENS_ADDRESS =
  "0xF5746B6243349FBE31fdF64474E36C0dF62790E9"; // local fallback from ABIs

class TalWeb3 {
  constructor() {
    this.web3 = null;
    this.provider = null;
    this.account = null;
    this.networkId = null;
    this.tal = null;
    this.talentTokens = null;
  }

  async initialize() {
    await this.loadWeb3();
    await this.loadAccount();
    await this.loadNetworkId();
    await this.loadTal();
    await this.loadTalentTokens();
  }

  async loadAccount() {
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];

    return this.account;
  }

  async loadNetworkId() {
    this.networkId = await this.web3.eth.net.getId();

    return this.networkId;
  }

  talAddress() {
    let address;
    if (TalentProtocol.networks) {
      const talentProtocolTokenData = TalentProtocol.networks[this.networkId];
      if (talentProtocolTokenData) {
        address = talentProtocolTokenData.address;
      } else {
        if (TAL_ADDRESSES[this.networkId]) {
          address = TAL_ADDRESSES[this.networkId];
        } else {
          address = LOCAL_TAL_ADDRESS;
        }
      }
    } else {
      if (TAL_ADDRESSES[this.networkId]) {
        address = TAL_ADDRESSES[this.networkId];
      } else {
        address = LOCAL_TAL_ADDRESS;
      }
    }
    return address;
  }

  async loadTal() {
    const address = this.talAddress();

    if (address) {
      const contract = new this.web3.eth.Contract(TalentProtocol.abi, address);
      this.tal = new Tal(contract, this.account, this.networkId);
      await this.tal.getBalance();
    } else {
      this.tal = new Tal(null, null, null);
      console.log("Talent Protocol contract not deployed to detected network.");
    }

    return this.tal;
  }

  async loadTalentTokens() {
    let address;
    if (TalentProtocolFactory.networks) {
      const talentProtocolFactoryData =
        TalentProtocolFactory.networks[this.networkId];
      if (talentProtocolFactoryData) {
        address = talentProtocolFactoryData.address;
      } else {
        if (TALENT_TOKENS_ADDRESSES[this.networkId]) {
          address = TALENT_TOKENS_ADDRESSES[this.networkId];
        } else {
          address = LOCAL_TALENT_TOKENS_ADDRESS;
        }
      }
    } else {
      if (TALENT_TOKENS_ADDRESSES[this.networkId]) {
        address = TALENT_TOKENS_ADDRESSES[this.networkId];
      } else {
        address = LOCAL_TALENT_TOKENS_ADDRESS;
      }
    }

    if (address) {
      const contract = new this.web3.eth.Contract(
        TalentProtocolFactory.abi,
        address
      );
      this.talentTokens = new TalentTokens(
        contract,
        this.networkId,
        this.web3,
        this.account
      );
    } else {
      this.talentTokens = new TalentTokens(null, null, this.web3, this.account);
      console.log(
        "Talent Protocol Factory contract not deployed to detected network."
      );
    }

    return this.talentTokens;
  }

  async loadWeb3() {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });

    if (provider) {
      this.provider = provider;
      this.web3 = new Web3(provider);
    } else if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
    return true;
  }
}

export { TalWeb3 };
