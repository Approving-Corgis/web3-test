import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

var web3 = new Web3(Web3.givenProvider);

const readableChain = (chain) => {
  switch (chain) {
    case '0x4':
      return 'Rinkeby';
    case '0x1':
      return 'Ethereum Main Network';
    default:
      break;
  }
}

const Mint = () => { 
  const chain = '0x4';

  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isCorrectChain, setIsCorrectChain] = useState(false);


  const isMetaMaskInstalled = () => {
    const { isMetaMask } = ethereum
    return Boolean(isMetaMask)
  }

  useEffect(() => {
    if(isMetaMaskInstalled()){
      setHasMetamask(true);
    } else {
      setHasMetamask(false);
    }
  }, [hasMetamask]);

  useEffect(() => {
    if(ethereum.isConnected) {
      getAccounts();
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    getChainId();
  })

  useEffect(() => {
    ethereum.on('chainChanged', () => {
      getChainId();
    })
  })

  const getAccounts = async() => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAddresses(accounts);
  }

  const getChainId = async () => {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if(chainId !== chain) {
      setIsCorrectChain(false);
    } else {
      setIsCorrectChain(true);
    }
  }


  const connectMetaMask = async () => {
    try {
      // ask user permission to access his accounts
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAddresses(accounts);
      setConnected(true);
    } catch (error) {
      setConnected(false);
    }
  }

  return (
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
                <h2>Wrong Chain. Chain must be {readableChain(chain)}</h2>
            )
          )
          :
        <h2>You must install metamask</h2>
      }
    </div>
  )
}

export default Mint;