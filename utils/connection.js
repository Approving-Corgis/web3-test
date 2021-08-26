export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        return {address: addressArray[0], status: 'Connected'}
      } else {
        return {address: null, status: 'Not Conncted'};
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: 'No MetaMask Installed'
    };
  }
};

export const checkChain = async () => {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if(chainId === '0x4') {
    return true;
  } else {
    return false;
  }
}