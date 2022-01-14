import React, { useEffect, useState, useCallback } from "react";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import twitterImg from '../assets/home/bottom-twitter.png'
import telementImg from '../assets/home/bottom-telement.png'
import discoverImg from '../assets/home/bottom-discover.png'
import githubImg from '../assets/home/bottom-github.png'
import docImg from '../assets/home/bottom-doc.png'

import twitterDarkImg from '../assets/home/twitter-dark.png'
import telementDarkImg from '../assets/home/telement-dark.png'
import discoverDarkImg from '../assets/home/disccard-dark.png'
import githubDarkImg from '../assets/home/github-dark.png'
import docDarkImg from '../assets/home/doc-dark.png'
import { NavLink } from "react-router-dom";

function HomeLinkList({dark}){
  const imageStyle = {width: "20px", height: "20px", paddingLeft: "32px"}
  return (
    <div className="nav-link-list">
      <Link target="_blank" href="https://twitter.com/NoahArkDAO">
        <img style={imageStyle} src={dark==="dark"?twitterDarkImg:twitterImg} alt="" />
      </Link>
      <Link target="_blank" href="https://t.me/NoahArkDAO">
        <img style={imageStyle} src={dark==="dark"?telementDarkImg:telementImg} alt="" />
      </Link>
      <Link target="_blank" href="https://discord.com/invite/KaTFSdmj9f">
        <img style={imageStyle} src={dark==="dark"?discoverDarkImg:discoverImg} alt="" />
      </Link>
      <Link target="_blank" href="https://github.com/NoahArkDAO">
        <img style={imageStyle} src={dark==="dark"?githubDarkImg:githubImg} alt="" />
      </Link>
      <Link target="_blank" href="https://docs.noahark.money/">
        <img style={imageStyle} src={dark==="dark"?docDarkImg:docImg} alt="" />
      </Link>
    </div>
  )
}

export default HomeLinkList;