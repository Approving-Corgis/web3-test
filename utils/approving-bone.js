import approvingABI from "./approving-bone-abi.json";
import Web3 from 'web3';

const contractAddress = "0x0Af9F92A91E724Dd4E542FaCd2cc46cBd7F504d4";
const web3 = new Web3(Web3.givenProvider);

/*
  * This function checks whether the user's account can mint bone
  * Or if they are eligible
*/
const hasEarlyAccess = async () => {
  if (window.ethereum) { 
    window.contract = new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const hasAccess = window.contract.methods.earlyAccessAddresses(window.ethereum.selectedAddress).call();
      return hasAccess;
    } catch (error) {
      console.log('eearly access error:: ', error)
    }
  }
}

/*
  * This function checks whether the user has already minted a bone
  * If they do, then they can no longer mint
  * OGs can only have 1 Bone
*/
const balanceOf = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const balance = await  window.contract.methods.balanceOf(window.ethereum.selectedAddress).call()
      console.log("🚀 ~ file: approving-bone.js ~ line 33 ~ balanceOf ~ balance", balance)
      return balance;
    } catch (error) {
      console.log('eearly access error:: ', error)
    }
  }
}

/*
  * This function checks maximum number of Bones available
  * Should be 400
*/
const checkMaxBones = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const maxBones = await  window.contract.methods.maxBones().call()
      console.log("🚀 ~ file: approving-bone.js ~ line 48 ~ checkMaxBones ~ maxBones", maxBones)
      return maxBones;
    } catch (error) {
      console.log('eearly access error:: ', error)
    }
  }
}

/*
  * This function checks if bone minting is currently active
*/
const checkIfBoneMintIsActive = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const isActive = await  window.contract.methods.boneMintActive().call()
      return isActive;
    } catch (error) {
      console.log('eearly access error:: ', error)
    }
  }
}

/*
  * This function checks current number of minted Bones
*/
const checkCurrentBonesMinted = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const currentBones = await  window.contract.methods.totalSupply().call()
      console.log("🚀 ~ file: approving-bone.js ~ line 64 ~ checkCurrentBonesMinted ~ currentBones", currentBones)
      return currentBones;
    } catch (error) {
      console.log('eearly access error:: ', error)
    }
  }
}

/*
  * This function mints 1 bone, if the user has not yet claimed theirs
*/
const mintOneBone = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(approvingABI, contractAddress);
    try {
      const mint = await  window.contract.methods.mintBone().send({from: window.ethereum.selectedAddress});
      console.log("🚀 ~ file: approving-bone.js ~ line 31 ~ mintBone ~ mint", mint)
      return mint;
    } catch (error) {
      console.log("🚀 ~ file: approving-bone.js ~ line 34 ~ mintBone ~ error", error)
    }
  }
}

export { 
  hasEarlyAccess, 
  balanceOf,
  mintOneBone,
  checkMaxBones,
  checkCurrentBonesMinted,
  checkIfBoneMintIsActive
}