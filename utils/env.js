const env = 'development';
import { addressesMainnet } from "./adresses";
import { addressesFreeMint } from "./adresses-free-mint";
import { addressesBone } from "./addresses-bone";
import boneDevABI from "./approving-bone-abi.dev.json";
import corgiDevABI from "./approving-corgis-abi.dev.json";
import tastybonesABI from "./tasty-bones-abi.dev.json";

import boneProdABI from "./approving-bone-abi.prod.json";
import corgiProdABI from "./approving-corgis-abi.prod.json";
const config = {
  production: {
    boneContract: '0x77C7f7Dc1b592E884966f0dc4AE0fFB93CBA1a7e',
    boneABI: boneProdABI,
    corgiContract: '0x4F1B1306E8bd70389d3C413888a61BB41171a0Bc',
    corgiABI: corgiProdABI,
    tastyBonesContract: '0x8aC56A02809A783CCfc1C4D105B18F098f092977',
    tbABI: tastybonesABI,
    addresses: addressesMainnet
  },
  development: {
    boneContract: '0x00f54A797d13F868b2d784D98b5B270Ff4e9aFA6',
    boneABI: boneDevABI,
    corgiContract: '0x10F5A77Fc1324d989810823eaDa2CfE8C01716B0',
    corgiABI: corgiDevABI,
    tastyBonesContract: '0x67033b66c33F5F9AC7E7B3eb635A47f6FA82A0C2',
    tbABI: tastybonesABI,
    addressesFreeMint: addressesFreeMint,
    addressesBone: addressesBone,
  }
}

export default config[env];
