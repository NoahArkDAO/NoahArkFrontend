import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, SvgIcon, Typography, Popper, Paper, Divider, Link, Slide, Fade } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { useWeb3Context } from "src/hooks/web3Context";
import { IReduxState } from "src/slices/state.interface";

function addNet({ theme }: { theme: any }) {
  const { connect, disconnect, connected, chainID, _switchNet, _addNet } = useWeb3Context();
  const pendingTransactions = useSelector<IReduxState, any>(state => {
    return state.pendingTransactions;
  });
  let buttonText = <Trans>Switch to AVAX</Trans>;
  let addNetButtonText = <Trans>Add AVAX</Trans>;

  //   if (isConnected) {
  //     buttonText = <Trans>Disconnect</Trans>;
  //     clickFunc = disconnect;
  //   }

  //   if (pendingTransactions && pendingTransactions.length > 0) {
  //     buttonText = <Trans>In progress</Trans>;
  //     clickFunc = handleClick;
  //   }
  const primaryColor = theme === "light" ? "#49A1F2" : "#F8CC82";
  const buttonStyles = "pending-txn-container";
  //  + (isHovering && pendingTransactions.length > 0 ? " hovered-button" : "");
  const clickFunc = async () => {
    const switchNet = await _switchNet("0xa86a").catch((err: any) => {
      const addNet = _addNet("0xa86a");
    });
  };
  return (
    <div
      //   onMouseEnter={e => (pendingTransactions && pendingTransactions.length > 0 ? handleClick(e) : null)}
      //   onMouseLeave={e => (pendingTransactions && pendingTransactions.length > 0 ? handleClick(e) : null)}
      className="wallet-menu"
      id="wallet-menu"
    >
      {chainID !== 43114 && (
        <Button
          id="wallet-button"
          className={buttonStyles}
          variant="contained"
          color="secondary"
          size="large"
          // style={pendingTransactions.length > 0 ? { color: primaryColor } : {}}
          onClick={clickFunc}
          // onMouseOver={() => setIsHovering(true)}
          // onMouseLeave={() => setIsHovering(false)}
          key={1}
        >
          {buttonText}
          {/* {pendingTransactions.length > 0 && (
          <Slide direction="left" in={isHovering} {...{ timeout: 333 }}>
            <SvgIcon className="caret-down" component={CaretDownIcon} htmlColor={primaryColor} />
          </Slide>
        )} */}
        </Button>
      )}
    </div>
  );
}
export default addNet;
