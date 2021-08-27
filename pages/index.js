import React, { useCallback, useEffect, useState } from 'react';
import { 
  balanceOf, 
  hasEarlyAccess, 
  mintOneBone, 
  checkMaxBones,
  checkCurrentBonesMinted } from '../utils/approving-bone';
import { mintEarlyAccess } from '../utils/approving-corgis-early-access';
import { checkChain, getCurrentWalletConnected } from '../utils/connection';


const Home = () => { 
  const chain = '0x4';

  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState('');
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [isAllowedToMint, setIsAllowedToMint] = useState(false);
  const [alreadyOwnedBone, setAlreadyOwnedBone] = useState(false);
  const [maxBones, setMaxBones] = useState(0);
  const [currentBones, setCurrentBones] = useState(0);
  const [mintQt, setMintQt] = useState(0);

  const handleChange = (event) => {
    setMintQt(event.target.value)
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

  const mintBoneNow = async () => {
    const mint = await mintOneBone();
    console.log("🚀 ~ file: index.js ~ line 85 ~ mintBone ~ mint", mint)
  }

  const mintCorgis = async () => {
    const payload = {
      amount: (mintQt  * 0.05),
      numberOfTokens: mintQt,
    }
    const mint = await mintEarlyAccess(payload);
    console.log("🚀 ~ file: index.js ~ line 85 ~ mintBone ~ mint", mint)
  }

  const checkAvailability = async() => {
    const bones = await checkMaxBones();
    const availableBones = await checkCurrentBonesMinted();
    setMaxBones(bones);
    setCurrentBones(availableBones);
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
                  <button onClick={() => mintBoneNow()}>Mint Bone</button>
                  <p>Current: {currentBones} / {maxBones}</p>
                </div>
                :
                <div>You are not allowed to Mint</div>
            )
          )
        }
      </div>
        { alreadyOwnedBone && (
          <div>
            Quantity <input type="number" value={mintQt}  onChange={handleChange} />
            <button onClick={() => mintCorgis()}>Mint Early Access</button>
          </div>
        )}
      <div>

      </div>
    </div>
  )
}

export default Home;