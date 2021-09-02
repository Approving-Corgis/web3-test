const env = 'development';
import { addressesMainnet } from "./adresses";
import { addressesTestnet } from "./adresses-test";
import boneDevABI from "./approving-bone-abi.dev.json";
import corgiDevABI from "./approving-corgis-abi.dev.json";

const config = {
  production: {
    boneContract: '',
    boneABI: '',
    corgiContract: '',
    corgiABI: '',
    addresses: addressesMainnet
  },
  development: {
    boneContract: '0x00f54A797d13F868b2d784D98b5B270Ff4e9aFA6',
    boneABI: boneDevABI,
    corgiContract: '0x10F5A77Fc1324d989810823eaDa2CfE8C01716B0',
    corgiABI: corgiDevABI,
    addresses: addressesTestnet
  }
}

export default config[env];
