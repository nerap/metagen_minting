import './Body.scss';
import React, { useState } from 'react';
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import Background from "../assets/parrallax/Fond.png"
import Header from './Header';
import Minter from './Minter';
import FrontLeft from "../assets/parrallax/Front_Left.png"
import FrontRight from "../assets/parrallax/Front_Right.png"
import Pont from "../assets/parrallax/Pont.png"
import Black from "../assets/parrallax/Black_Solid.png"
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3Modal from "web3modal";


function Body() {

  const [account, setAccount] = useState("0x0");
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId]: any = useState("0x1");


  var provider;

  var web3Modal_main: any;

  var web3_main: any = null;


  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "189b4cbb822343029eed80c77a55640d",
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
      }
    }
  };


  web3Modal_main = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions
  });

  async function getProviderWalletConnect() {

    try {
      provider = await web3Modal_main.connect();

      if (provider.hasOwnProperty('_state')) {
        setAccount(provider._state.accounts[0])
        setConnected(provider._state.isConnected)
        setChainId(provider.chainId)
      }
      else if (provider) {
        setAccount(provider.accounts[0])
        setConnected(provider.connected)
        setChainId(provider.chainId)
      }

      await provider.on("accountsChanged", async (account: any) => {
        if (account.length === 0) {
          setConnected(false);
          setAccount("0x0");
          setChainId("0x1");
          if (web3_main != null)
            await web3Modal_main.clearCachedProvider();
        }
        else
          setAccount(account[0])
      });

      await provider.on("chainChanged", async (chainId: any) => {
        setChainId(chainId)
      });

      await provider.on("connect", async () => { setConnected(true) });

      await provider.on("disconnect", async () => {
        setConnected(false);
        setAccount("0x0");
        setChainId("0x1");
        if (web3_main != null)
          await web3Modal_main.clearCachedProvider();
      });

      await provider.on("close", async () => {
        setConnected(false);
        setAccount("0x0");
        setChainId("0x1");
        if (web3_main != null)
          await web3Modal_main.clearCachedProvider();
      });
      await provider.enable();
      return provider;
    }
    catch (e) {
      console.log(e);
    }
  }

  async function getLibrary() {

    var provider = await getProviderWalletConnect();
    if (provider) {
      web3_main = new Web3(provider);
      return web3_main;
    }
    return
  }


  return (
    <div className='body-main'>
      <MouseParallaxContainer className='main_parra'>
        <Header account={account} />
        {chainId === "0x1" || chainId === 1 ?
          account !== "0x0" ?
            <Minter connected={connected} account={account} />
            :
            <div className='button-div-main'>
              <div className='button-main' onClick={getLibrary} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                CONNECT WALLET
              </div>
            </div>
          :
          <div className='bad_network'>
            <div className='bad_network_text'>
              Please check your network. This network is not compatible.
            </div>
          </div>
        }
        <MouseParallaxChild className="back_parra" factorX={0.006} factorY={0.01} >
          <img src={Background} alt="" className='back_img' />
        </MouseParallaxChild>
        <MouseParallaxChild className='pont_parra' factorX={0.01} factorY={0.017}>
          <img src={Pont} alt="" className='pont_img' />
        </MouseParallaxChild>
        <div className='black_parra'>
          <img src={Black} alt="" className='black_img' />
        </div>
        <MouseParallaxChild className='front_left_parra' factorX={0.025} factorY={0.033}>
          <img src={FrontLeft} alt="" className='front_left_img' />
        </MouseParallaxChild>
        <MouseParallaxChild className='front_right_parra' factorX={0.025} factorY={0.033}>
          <img src={FrontRight} alt="" className='front_right_img' />
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </div>
  );
}

export default Body;