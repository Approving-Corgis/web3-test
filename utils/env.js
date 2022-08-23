const env = 'production';

import { freeMint } from "./free-mint";
import { allowList } from "./allow-list";
import { raffleMint } from "./raffle-mint";

import boneDevABI from "./approving-bone-abi.dev.json";
import corgiDevABI from "./approving-corgis-abi.dev.json";
import tastybonesABI from "./tasty-bones-abi.dev.json";
import tastybonesProdABI from "./tasty-bones-abi.prod.json";

import boneProdABI from "./approving-bone-abi.prod.json";
import corgiProdABI from "./approving-corgis-abi.prod.json";
import wenwlABI from "./wen-wl.json";
import { addressesTestnet } from "./adresses-test";
import { wlAddresses } from "./wl-address";
import { waitAddresses } from "./wait-addresses";
const config = {
  production: {
    boneContract: '0x77C7f7Dc1b592E884966f0dc4AE0fFB93CBA1a7e',
    boneABI: boneProdABI,
    corgiContract: '0x4F1B1306E8bd70389d3C413888a61BB41171a0Bc',
    corgiABI: corgiProdABI,
    tastyBonesContract: '0xB11bFefB6E6A3Bd922A3b934C870EdAd396EcAc8',
    tbABI: tastybonesProdABI,
    addressesFreeMint: freeMint,
    addressesPresale: wlAddresses,
    addressesRaffle: waitAddresses,
    wenwlContract: '0xb9b8f97ef48127A8915c689C0e3EBCF0d74acc53',
    wnwlABI: wenwlABI,
  },
  development: {
    boneContract: '0x00f54A797d13F868b2d784D98b5B270Ff4e9aFA6',
    boneABI: boneDevABI,
    corgiContract: '0x10F5A77Fc1324d989810823eaDa2CfE8C01716B0',
    corgiABI: corgiDevABI,
    tastyBonesContract: '0x40e45414C5A19598198398Ac1Fa0A3E0a19d04A0',
    tbABI: tastybonesABI,
    wenwlContract: '0x9654473254c8150B3d5C1984dd1eb4978fC3C2a5',
    wnwlABI: wenwlABI,
    addressesFreeMint: freeMint,
    addressesPresale: allowList,
    addressesRaffle: raffleMint,
    addresses: addressesTestnet,
  }
}

export default config[env];
