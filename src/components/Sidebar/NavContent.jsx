/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as NoaharkIcon } from "../../assets/icons/noahark-nav-header.svg";
import { ReactComponent as NoaharkIconDark } from "../../assets/icons/noahark-nav-header-dark.svg";
import { ReactComponent as ZapIcon } from "../../assets/icons/zap.svg";
import { Trans } from "@lingui/macro";
import Davatar from "@davatar/react";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";

function NavContent({ themes }) {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();
  const { bonds } = useBonds(chainID);
  const { ensName } = useAddress(address);
  console.log("ensName: ", ensName);
  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link component={NavLink} to="/" target="_blank">
              <SvgIcon
                color="primary"
                component={themes === "dark" ? NoaharkIconDark : NoaharkIconDark}
                viewBox="0 0 177 100"
                style={{ minWidth: "177px", minHeight: "98px", width: "177px" }}
              />
            </Link>

            {address && (
              <div className="wallet-link">
                <span className="davatar">
                  <Davatar size={20} address={address} />
                </span>
                <Link href={`https://snowtrace.io/address/${address}`} target="_blank">
                  {ensName || shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/app/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  <Trans>Dashboard</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/app/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={StakeIcon} />
                  <Trans>Stake</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/app/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BondIcon} />
                  <Trans>Bond</Trans>
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body2">
                    <Trans>Bond discounts</Trans>
                  </Typography>
                  {bonds.map((bond, i) => (
                    <Link component={NavLink} to={`/app/bonds/${bond.name}`} key={i} className={"bond"}>
                      {/* {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : ( */}
                      <Typography variant="body2">
                        {bond.displayName}

                        <span className="bond-pair-roi">
                          {!bond.isAvailable[chainID]
                            ? "Sold Out"
                            : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
                        </span>
                      </Typography>
                      {/* )} */}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                component={NavLink}
                to="/app/calculator"
                isActive={(match, location) => {
                  return checkPage(match, location, "calculator");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={ZapIcon} />
                  Calculator
                </Typography>
              </Link>
              <div className="dapp-menu-external-links">
                {Object.keys(externalUrls).map((link, i) => {
                  return (
                    <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                      <Typography variant="h6">{externalUrls[link].icon}</Typography>
                      <Typography variant="h6">{externalUrls[link].title}</Typography>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {/*{Object.keys(externalUrls).map((link, i) => {*/}
            {/*  return (*/}
            {/*    <Link key={i} href={`${externalUrls[link].url}`} target="_blank">*/}
            {/*      <Typography variant="h6">{externalUrls[link].icon}</Typography>*/}
            {/*      <Typography variant="h6">{externalUrls[link].title}</Typography>*/}
            {/*    </Link>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
