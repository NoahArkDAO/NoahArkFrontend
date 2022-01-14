import "./preSale.scss";
import React, { useEffect, useState, useCallback } from "react";
import { InputAdornment , OutlinedInput} from "@material-ui/core";
import { useAppSelector } from "../hooks";
import { useWeb3Context } from "src/hooks/web3Context";
import {Button} from "@material-ui/core";
import { t, Trans } from "@lingui/macro";
import ARNKIcon from "../assets/home/ARNK.png";
import NRKIcon from "../assets/home/NRK.png"
import arrowIcon from "../assets/home/arrow.png";
import { isPendingTxn, txnButtonText } from "../slices/PendingTxnsSlice";
import { migrateApprove, migratingAnrk } from "../slices/MigrateSlice";
import { useDispatch } from "react-redux";
import { error } from "../slices/MessagesSlice";
import { addresses, TOKEN_DECIMALS } from "../constants";
import DAIIcon from "../assets/home/DAI.png";
import NrkImg from "../assets/tokens/token_NRK.svg";
import ANRKImgSVG from "../assets/tokens/ANRK.svg";
import DAIImgSVG from "../assets/tokens/DAI.svg";
import { segmentUA } from "../helpers/userAnalyticHelpers";
const addTokenToWallet = (tokenSymbol , tokenAddress , address ) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath;
    let tokenDecimals = TOKEN_DECIMALS;
    switch (tokenSymbol) {
      case "DAI":
        tokenPath = DAIImgSVG;
        tokenDecimals = 18;
        break;
      case "NRK":
        tokenPath = NrkImg;
        break;
      case "aNRK":
        tokenPath = ANRKImgSVG;
        break;
      default:
        tokenPath = NrkImg;
    }
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: imageURL,
          },
        },
      });

    } catch (error) {
      console.log(error);
    }
  }
};
function Migrate() {
  const dispatch = useDispatch();
  const [nrkAmount, setNrkAmount] = useState('');
  const [anrkAmount, setAnrkAmount] = useState('');

  const { provider, address, connected, connect, chainID, _switchNet, _addNet  } = useWeb3Context();
  const anrkBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.anrk;
  });
  const anrkAllowance = useAppSelector(state => {
    return (state.account.trading && state.account.trading.anrkApprove) || 0;
  });
  const onMigrateAnrk= async (anrkAmount) => {
    if (chainID !== 43114) {
      const switchNet = await _switchNet("0xa86a").catch((err) => {
        const addNet = _addNet("0xa86a");
      });
    }
    if (anrkAmount > parseFloat(anrkBalance)) {
      return dispatch(error(t`You don't have enough aNRK`));
    }
    await dispatch(migratingAnrk({amount: anrkAmount, provider, address, networkID: chainID }));
  };
  const onMigrateApprove= async () => {
    if (chainID !== 43114) {
      const switchNet = await _switchNet("0xa86a").catch((err) => {
        const addNet = _addNet("0xa86a");
      });
    }
    await dispatch(migrateApprove({ provider, address, networkID: chainID }));
  };
  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });
  const hasAllowance = useCallback(
    () => {
      return anrkAllowance > 0;
    },
    [anrkAllowance],
  );
  const handleCoinInputChange = (e) => {
    let reg = new RegExp(/^\d*\.{0,1}\d*$/)
    if(reg.test(e)){
            setNrkAmount(e);
      setAnrkAmount(e);
    }
  };
  return(<div className="migrate-nrk-card">
      <div className="pre-sale-content" style={{padding:'50px 0 0'}}>
      <div className="purchase-quantity">
      <OutlinedInput
        type="text"
        placeholder="Amount"
        className="pre-sale-input"
        value={anrkAmount}
        onChange={e => handleCoinInputChange(e.target.value)}
        labelWidth={0}
        endAdornment={
          <InputAdornment position="end">
            <div
              onClick={e => handleCoinInputChange(anrkBalance)}
              className="pre-sale-input-max-btn"
            >
              <p>Max</p>
            </div>
          </InputAdornment>
        }
      
      />
       <div className="purchase-quantity-left">
            <img className="coin-icon" src={ARNKIcon} alt="" />
            <span className="anrk-text" onClick={addTokenToWallet("aNRK", addresses[chainID].ANRK_ADDRESS, address)}>aNRK</span>
          </div>
          </div>
      <div className="migrate-arr-img" style={{padding:'20px 0px 20px'}}><img src={arrowIcon} alt="" /></div>
      <div className="purchase-quantity">

      <OutlinedInput
        type="number"
        placeholder="Amount"
        className="pre-sale-input1"
        value={nrkAmount}
        onChange={e => handleCoinInputChange(e)}
        labelWidth={0}
      />
       <div className="purchase-quantity-left">
            <img className="coin-icon" src={NRKIcon} alt="" />
            <span className="anrk-text" onClick={addTokenToWallet("NRK", addresses[chainID].NRK_ADDRESS, address)}>NRK</span>
          </div>
      </div>
      {address && hasAllowance() ? (
          <Button
            className="pre-sale-button"
            disabled={isPendingTxn(pendingTransactions, "on_migrating")}
            onClick={() => {
              onMigrateAnrk(anrkAmount);
            }}
          >
            {txnButtonText(pendingTransactions, "on_migrating", t`buy`)}
          </Button>
        ) : (
          <Button
            className="pre-sale-button"
            disabled={isPendingTxn(pendingTransactions, "approve_migrate")}
            onClick={() => {
              onMigrateApprove();
            }}
          >
            {txnButtonText(pendingTransactions, "approve_migrate", t`Approve`)}
          </Button>
        )}
     </div>
  </div>)
}
export default Migrate;