import React from "react";
import "./styles.css";
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { RWebShare } from "react-web-share";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">
        <h2 style={{ color: "#fff" }}>CryptoTracker.</h2>
      </Link>

      <div className="socials-flex">
        <a target="_blank" href="http://github.com/rupesh989">
          <GitHub className="socials-icon" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/rupesh-bavaskar">
          <LinkedIn className="socials-icon" />
        </a>
        <a target="_blank" href="mailto:rupeshbavaskar45@gmail.com">
          <EmailIcon className="socials-icon" />
        </a>
        <RWebShare
          data={{
            text: "Crypto Dashboard made using React JS in 2023",
            url: "https://crypto-dashboard-zaid.netlify.app/",
            title: "Crypto Dashboard",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <SendIcon className="socials-icon" />
        </RWebShare>
      </div>
    </div>
  );
};

export default Footer;