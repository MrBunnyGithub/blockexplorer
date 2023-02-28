import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  //const [blockNumber, setBlockNumber] = useState();
  const [address, setAddress] = useState();
  const [contract, setContract] = useState();
  const [contractName, setContractName] = useState();
  const [balance, setBalance] = useState();
  const [symbol, setSymbol] = useState();

  useEffect(() => {
    

    async function getTokenData(address,contract) {
      
      const token  = await alchemy.core.getTokenBalances(address,[contract]);

      console.log(token);

      let balance = token.tokenBalances[0].tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(contract);
      console.log(metadata);

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      setBalance(balance);
      setContractName(metadata.name);
      setSymbol(metadata.symbol);

    }

    setAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"); // vitalik Address
    setContract("0xdAC17F958D2ee523a2206206994597C13D831ec7"); // USDT Contract

    getTokenData(address,contract);

    //let token = getTokenData(address,contract);
    //console.log(token);

    //let balance =  token.address;
    //  console.log(balance);

  });

 return (

  <div className="App">
  <div>Vitalik Address: {address}</div>
  <div>Contract Name: {contractName}</div>
  <div> Contract Symbol: ${symbol}</div>
  <div>Balance: {balance}</div>
  </div>
  );


}

export default App;
