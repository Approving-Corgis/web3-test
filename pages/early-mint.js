import React, { useCallback, useEffect, useState } from 'react';
import { balanceOf } from '../utils/approving-bone';
import { checkCurrentCorgisMinted, checkMaxEarlyAccess, mintEarlyAccess, checkIfEarlyAccessIsActive } from '../utils/approving-corgis-early-access';
import { checkChain, getCurrentWalletConnected } from '../utils/connection';


const Home = () => { 
  const chain = '0x4';

  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState('');
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [maxEarly, setMaxEarly] = useState(0);
  const [mintQt, setMintQt] = useState(0);
  const [isAllowedToMint, setIsAllowedToMint] = useState(false);
  const [currentEarly, setCurrentEarly] = useState(0);
  const [isEarlyMintActive, setIsEarlyMintActive] = useState(false);

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
      checkHasEarlyAccess();
      checkAvailability();
      checkEarlyAccessIsActive();
    }
  }

  const checkEarlyAccessIsActive = async () => {
    const isActive = await checkIfEarlyAccessIsActive();
    setIsEarlyMintActive(isActive);
  }

  const getChainId = async () => {
    const chain = await checkChain();
    setIsCorrectChain(chain);
  }


  const connectMetaMask = async () => {
    getAccounts()
  }

  const checkHasEarlyAccess = async () => {
    try {
      const balance = await balanceOf();
      if(balance < 1) {
        setIsAllowedToMint(false);
      } else {
        setIsAllowedToMint(true);
      }
    } catch (error) {
      
    }
  }

  const mintCorgisEarly = async () => {
    const payload = {
      amount: (mintQt  * 0.05), // number of corgis * price
      numberOfTokens: mintQt,
    }
    const mint = await mintEarlyAccess(payload);
    console.log("🚀 ~ file: index.js ~ line 85 ~ mintBone ~ mint", mint)
  }

  const checkAvailability = async() => {
    const maxCorgis = await checkMaxEarlyAccess();
    const hasMinetd = await checkCurrentCorgisMinted();
    setMaxEarly(maxCorgis);
    setCurrentEarly(hasMinetd);
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
        { isEarlyMintActive ? (
          isAllowedToMint ? 
          <div>
            <h2>Early Access Mint</h2>
            Quantity <input type="number" value={mintQt}  onChange={handleChange} />
            <button onClick={() => mintCorgisEarly()}>Mint Early Access</button>
            <p>Count: {currentEarly}/{maxEarly}</p>
          </div>
          : 
          <h3>You are not eligible for early access</h3>
        ) : 
          <div>
            <h2>Early Access Mint Not Yet Active </h2>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;