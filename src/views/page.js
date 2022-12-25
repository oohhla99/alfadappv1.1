import React, {useState} from 'react'
import { useContractRead, useAccount } from "wagmi";
import contractABI from '../abis/abi.json'
import { toast } from 'react-toastify';
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { ConnectionButton } from '../components/ConnectionButton'
import './page.css'

const Page = (props) => {

   const { address, isConnected } = useAccount();

   let navigate = useNavigate();
 
  // Alfa Token mainnet address is the contract address here
   const contractAddress = "0x5609972dd1655455eabc7019b9df15f8d00640ba";

  const {data: balanceOfCheck} = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address]
  })

  console.log(balanceOfCheck, "the balance");

  //converting hex to normal number // note - .toLocalString("en")
  const hexToDecimal = (hex) => parseInt(hex, 16);
  // const bal = balanceOfCheck
  // console.log(bal)

  const balance = (balanceOfCheck ? hexToDecimal(balanceOfCheck._hex)/1e18 : 0 );
  console.log(balance);

  //function to enter Dapp
  const enterDapp = () => {
    if (balance >= 5000000) {
     navigate('/alpha-teleporthq')
    } else {
     toast.warning('You need to be holding atleast 5,000,000 (0.5%) $ALFA tokens before you can continue! Proceed by getting $ALFA token', {
     position: toast.POSITION.TOP_CENTER, theme: "dark",
     autoClose: 9000
    });
 }
}
  return (
    <div className="page-container">
      <Helmet>
        <title>Page - alfa dapp</title>
        <meta property="og:title" content="Page - alfa dapp" />
      </Helmet>
      {/* {!isConnected ? */}
       <button className="page-button themebutton button">
        <ConnectionButton></ConnectionButton>
       </button>
       {/* :  */}
      {/* //  {address?.slice(0, 10)}.... */}
       {/* <button className="page-button themebutton button"></button> */}
       {/* } */}
      <div className="page-banner">
        <img
          src="/playground_assets/dappper.svg"
          alt="image"
          className="page-image"
        />
        <h1 className="page-text">alfa.dapp</h1>
        <span className="page-text1">v1.0</span>
        <span className="page-text2">
          You need to be holding atleast 5,000,000 (0.5%) $ALFA tokens
        </span>
        <a
          href="https://app.uniswap.org/#/swap?outputCurrency=0x5609972dD1655455EAbc7019B9Df15F8d00640BA&amp;chain=mainnet"
          target="_blank"
          rel="noreferrer noopener"
          className="page-link"
        >
          Get $ALFA
        </a>
        <button className="page-button1 themebutton button" onClick={enterDapp}>enter dapp</button>
      </div>
    </div>
  )
}

export default Page
