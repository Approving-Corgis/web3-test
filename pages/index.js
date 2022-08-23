import React, { useCallback, useEffect, useState } from 'react';
import { 
  balanceOf, 
  hasEarlyAccess, 
  mintOneBone, 
  checkMaxBones,
  checkCurrentBonesMinted, 
  addAddresses,
  hashIt} from '../utils/approving-bone';
import { checkChain, getCurrentWalletConnected } from '../utils/connection';
import { balanceOf as tbBalanceOf, createFreeBoneMerkle, mintFreesale, mintFreeWithBone } from '../utils/tasty-bones';
import { checkTotalSupply, togglePublic, withdraw } from '../utils/wen-wl';


const Home = () => { 
  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState('');
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [isAllowedToMint, setIsAllowedToMint] = useState(false);
  const [alreadyOwnedBone, setAlreadyOwnedBone] = useState(false);
  const [maxBones, setMaxBones] = useState(0);
  const [currentBones, setCurrentBones] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [roots, setRoots] = useState(null);

  const handleChange = (event) => {
    setMintQt(event.target.value)
  }
  const handleChangePub = (event) => {
    setPubMintQt(event.target.value)
  }

  const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum)
  }

  useEffect(() => {
    if(isMetaMaskInstalled()){
      getAccounts();
      setHasMetamask(true);
    } else {
      setHasMetamask(false);
    }
  }, [hasMetamask]);


  useEffect(() => {
    if(isMetaMaskInstalled()) {
      getChainId();
    }
  })

  useEffect(() => {
    if(isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', () => {
        getChainId();
      })
    }
  })

  const getAccounts = async() => {
    const connection = await getCurrentWalletConnected();
    if(connection.status === 'Connected') {
      setAddresses(connection.address);
      setConnected(true);
      // check if user has early access rights
      checkHasAccessToMintBone();
      checkAvailability();
    }
  }

  const getChainId = async () => {
    const chain = await checkChain();
    setIsCorrectChain(chain);
  }


  const connectMetaMask = async () => {
    getAccounts()
  }

  const checkHasAccessToMintBone = async () => {
    try {
      const balance = await balanceOf();
      if(balance < 1) {
        setAlreadyOwnedBone(false);
        const hasAccess = await hasEarlyAccess();
        setIsAllowedToMint(hasAccess);
      } else {
        setAlreadyOwnedBone(true);
      }
    } catch (error) {
      
    }
  }

  const createFreeBoneMerkleTree = async () => {
    try {
      const mint = await createFreeBoneMerkle();
      setRoots(mint)
    } catch (error) {
      
    }
  }


  const addMultiple = async () => {
    const mint = await addAddresses();
  }

  const checkAvailability = async() => {
    const bones = await checkMaxBones();
    const availableBones = await checkCurrentBonesMinted();
    setMaxBones(bones);
    setCurrentBones(availableBones);
  }

  const hashThatShit = async() => {
    const theHash = await hashIt();
  }


  const mintFreeWithBoneNow = async () => {
    const mint = await mintFreeWithBone();
    console.log("🚀 ~ file: index.js ~ line 85 ~ mintBone ~ mint", mint)
  }

  const mintFreeWithoutBone = async () => {
    const mint = await mintFreesale({numOfTokens: 1});
  }
  
  const withdrawWenWL = async () => {
    setInterval(async() => {
      let _totalSupply = await checkTotalSupply();
      setTotalSupply(_totalSupply);
    }, 10000);
  }

  return (
    <div>
      <div>
        {hasMetamask ? 
          (
            !connected ? 
              <button onClick={() => connectMetaMask()}>Connect Metamask</button>
            :
              (
                isCorrectChain ?
                  <p>{addresses}</p>
                  :
                  <h2>Wrong Chain. Chain must be Rinkeby</h2>
              )
            )
            :
          <h2>You must install metamask</h2>
        }
      </div>
      <div>
        {connected && 
          ( 
            alreadyOwnedBone ? 
              <div>
                You already own one
                <p>Current: {currentBones} / {maxBones}</p>
              </div>
            :
            (  
              isAllowedToMint ? 
                <div>
                  <p>You are allowed to Mint</p>
                  <button onClick={() => createFreeBoneMerkleTree()}>Create Merkle</button>
                  <p>Current: {currentBones} / {maxBones}</p>
                </div>
                :
                <div>You are not allowed to Mint</div>
            )
          )
        }
      </div>
      <div>
      {connected && 
        <>
          <div>
            <p>Create Hash</p>
            <button onClick={() => createFreeBoneMerkleTree()}>Create Hash</button>
          </div>
          <div>
            <p>Withdraw Wen WL</p>
            <button onClick={() => withdrawWenWL()}>Check Tote Supply</button>
          </div>
          <div>
            {
              roots !== null &&
              <>
                <p>Whitelist Root: {roots.wl}</p>
                <p>Waitlist Root: {roots.wait}</p>
                {/* <p>Raffle Root: {roots.raffleRoot}</p> */}
              </>
            }
          </div>
        </>
        }
      </div>
    </div>
  )
}

export default Home;