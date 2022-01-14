export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/noaharkdao/noaharkdao-fuji";
export const EPOCH_INTERVAL = 300;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 2;

export const TOKEN_DECIMALS = 9;

interface IPoolGraphURLS {
  [index: string]: string;
}

export const POOL_GRAPH_URLS: IPoolGraphURLS = {

};

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  43114: {
    DAI_ADDRESS: "0xd5...8d70",
    NRK_ADDRESS: "0x18...DD0c",
    TREASURY_ADDRESS: "0x1A...c952",
    STAKING_ADDRESS: "0x29...b3FE",
    SNRK_ADDRESS: "0x52...Be29",
    DISTRIBUTOR_ADDRESS: "0x42...211F",
    STAKING_HELPER_ADDRESS: "0x8C...23e6",
    BONDINGCALC_ADDRESS: "0x96...9F91",
    REDEEM_HELPER_ADDRESS: "0xB3...b336",
    DAI_BOND_ADDRESS: "0xDd...C9a0",
    DAI_RESERVE_ADDRESS: "0x66...F277",
    NRK_DAI_BOND_ADDRESS: "0xDd...e6ec",
    NRK_DAI_RESERVE_ADDRESS: "0x76...C967",

    ANRK_ADDRESS: "0x7A...8060",
    ANRK_SALE_ADDRESS: "0x71...802e",
    ANRK_EXCHANGE_ADDRESS: "0x71...81C9",

  },
  43113: {
    DAI_ADDRESS: "0xd5...8d70",
    NRK_ADDRESS: "0x18...DD0c",
    TREASURY_ADDRESS: "0x1A...c952",
    STAKING_ADDRESS: "0x29...b3FE",
    SNRK_ADDRESS: "0x52...Be29",
    DISTRIBUTOR_ADDRESS: "0x42...211F",
    STAKING_HELPER_ADDRESS: "0x8C...23e6",
    BONDINGCALC_ADDRESS: "0x96...9F91",
    REDEEM_HELPER_ADDRESS: "0xB3...b336",
    DAI_BOND_ADDRESS: "0xDd...C9a0",
    DAI_RESERVE_ADDRESS: "0x66...F277",
    NRK_DAI_BOND_ADDRESS: "0xDd...e6ec",
    NRK_DAI_RESERVE_ADDRESS: "0x76...C967",

    ANRK_ADDRESS: "0x7A...8060",
    ANRK_SALE_ADDRESS: "0x71...802e",
    ANRK_EXCHANGE_ADDRESS: "0x71...81C9",

  }
};
