import React, { useEffect, useState } from 'react';
import { checkChain, getCurrentWalletConnected } from '../utils/connection';
import { deployContract } from '../utils/contract-deploy';
import { deployContractFromSolidity } from '../utils/contract-deploy-2';

const Deploy = () => { 
  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState('');
  const [isCorrectChain, setIsCorrectChain] = useState(false);

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
      // checkAvailability();
    }
  }

  const getChainId = async () => {
    const chain = await checkChain();
    setIsCorrectChain(chain);
  }


  const connectMetaMask = async () => {
    getAccounts();
  }

  const compileContract = async () => {
    await deployContract();
  }

  const compileAndDeployContract = async () => {
    await deployContractFromSolidity();
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
                <>
                  <p>Connected Address: {addresses}</p>
                  <button onClick={() => compileContract()}>Deploy Contract</button>
                  <button onClick={() => compileAndDeployContract()}>Deploy Contract with Solc</button>
                </>

                  :
                  <h2>Wrong Chain. Chain must be Rinkeby</h2>
              )
            )
            :
          <h2>You must install metamask</h2>
        }
      </div>
  )
}
  
export default Deploy;