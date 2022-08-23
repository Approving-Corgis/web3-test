import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { ABI } from '../contracts/Eldr';
import solc from 'solc';
import solFile from '../contracts/Eldr.sol';

export const deployContractFromSolidity = async() => {
  solc.compile(solFile, 1).contracts[':Eldr'];
  // const provider = await detectEthereumProvider();
  // if (!provider) throw new Error('No provider');
  // const library = new ethers.providers.Web3Provider(provider);
  // const signer = library.getSigner();

  // const factory = new ethers.ContractFactory(ABI.abi, ABI.bytecode, signer);
  // const contract = await factory.deploy(
  //   "0x52ca91b82dc2c058863c3a074e41f56787f51dd71fa842d9aa1001ef1812ba67", // contract argument 1
  //   "0x2ddf6ad291c0e44ab264c8ea10b43f680e6e66294bfe3e99f13f473905b784a4"); // contract argument 2
  // await contract.deployed();
  // console.log("🚀 ~ file: contract-deploy.js ~ line 16 ~ deployContract ~ contract", contract.address)
  
}