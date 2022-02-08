import Web3 from 'web3';
import config from "./env";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const contractAddress = config.tastyBonesContract;
const ABI = config.tbABI;
const addresses = config.addresses;
const addressesBoneFree = config.addressesBone;
const addressesFreeMint = config.addressesFreeMint;
const web3 = new Web3(Web3.givenProvider);

/*
  * This function checks whether the user has already minted a bone
  * If they do, then they can no longer mint
  * OGs can only have 1 Bone
*/
const balanceOf = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(ABI, contractAddress);
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
  * Check Bones of Owner
*/
const checkBonesOfOwner = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(ABI, contractAddress);
    try {
      const currentBones = await  window.contract.methods.bonesOfOwner(window.ethereum.selectedAddress).call()
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
const createFreeBoneMerkle = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(ABI, contractAddress);
    try {
      const boneLeafNodes = addressesBoneFree.map(addr => keccak256(addr));
      const freeBoneMerkleTree = new MerkleTree(boneLeafNodes, keccak256, { sortPairs: true});
      const claimingAddress = keccak256(window.ethereum.selectedAddress);
      console.log("🚀 ~ file: tasty-bones.js ~ BONE MERKLE ROOT", freeBoneMerkleTree.getHexRoot())
      const testverify = freeBoneMerkleTree.verify(freeBoneMerkleTree.getHexProof(claimingAddress), claimingAddress, freeBoneMerkleTree.getHexRoot());
      console.log("🚀 ~ freeBoneMerkleTree ~ testverify", testverify)

      const leafNodes = addressesFreeMint.map(addr => keccak256(addr.address));
      console.log("🚀 ~ file: tasty-bones.js ~ line 62 ~ createFreeBoneMerkle ~ leafNodes", leafNodes)
      const freeMintMerkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
      const claimingAddress2 = keccak256(window.ethereum.selectedAddress);
      console.log("🚀 ~ file: tasty-bones.js ~ FREE MINT MERKLE ROOT", freeMintMerkleTree.getHexRoot())
      const testverify2 = freeMintMerkleTree.verify(freeMintMerkleTree.getHexProof(claimingAddress2), claimingAddress2, freeMintMerkleTree.getHexRoot());
      console.log("🚀 ~ freeMintMerkleTree ~ testverify", testverify2)
      // return mint;
    } catch (error) {
      console.log("🚀 ~ file: approving-bone.js ~ line 34 ~ mintBone ~ error", error)
    }
  }

}


/*
  * This function mints 1 bone, if the user has not yet claimed theirs
*/
const mintFreeWithBone = async () => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(ABI, contractAddress);
    try {
      // FOR BONE
      const boneLeafNodes = addressesBoneFree.map(addr => keccak256(addr));
      const freeBoneMerkleTree = new MerkleTree(boneLeafNodes, keccak256, {sortPairs: true});
      const claimingAddress = keccak256(window.ethereum.selectedAddress);

      const mint = await window.contract.methods.mintFreeWithBone(
        2, // bone token ID 
        freeBoneMerkleTree.getHexProof(claimingAddress), // bone proof
        )
        .send(
          {
            from: window.ethereum.selectedAddress, 
            value: 0
          }
        );
      return mint;
    } catch (error) {
      console.log("🚀 ~ file: approving-bone.js ~ line 34 ~ mintBone ~ error", error)
    }
  }

}


/*
  * This function mints 1 bone, if the user has not yet claimed theirs
*/
const mintFreesale = async ({numOfTokens}) => {
  if (window.ethereum) { 
    window.contract = await new web3.eth.Contract(ABI, contractAddress);
    try {
      // FOR WL
      const leafNodes = addressesFreeMint.map(addr => keccak256(addr.address));
      const freeMintMerkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
      const claimingAddress2 = keccak256(window.ethereum.selectedAddress);
      const testverify2 = freeMintMerkleTree.verify(freeMintMerkleTree.getHexProof(claimingAddress2), claimingAddress2, freeMintMerkleTree.getHexRoot());
      console.log("🚀 ~ file: tasty-bones.js ~ line 96 ~ mintFreesale ~ testverify2", testverify2)
      
      const mint = await window.contract.methods.mintFreeWL(
        1, // number to Mint
        freeMintMerkleTree.getHexProof(claimingAddress2), // WL proof
        1, // max Mint
        )
        .send(
          {
            from: window.ethereum.selectedAddress, 
            value: 0
          }
        );
      return mint;
    } catch (error) {
      console.log("🚀 ~ file: approving-bone.js ~ line 34 ~ mintBone ~ error", error)
    }
  }

}

export { 
  balanceOf,
  checkBonesOfOwner,
  createFreeBoneMerkle,
  mintFreesale,
  mintFreeWithBone
}