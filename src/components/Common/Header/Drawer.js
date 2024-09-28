import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./styles.css";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const [mode, setMode] = useState(defaultDark ? true : false);

  const toggleTheme = (e) => {
    if (!mode) {
      setDark();
    } else {
      setLight();
    }
    setMode(!mode);
  };
  return (
    <div className="drawerDiv">
      <MenuRoundedIcon
        className="link"
        style={{ fontSize: "1.5rem", margin: 0 }}
        onClick={() => setOpen(true)}
      />
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer">
          <div
            style={{ textAlign: "end", cursor: "pointer", fontSize: "20px" }}
            onClick={() => setOpen(false)}
          >
            {open ? "X" : ""}
          </div>
          <Link to="/">
            <p className="link">Home</p>
          </Link>

          <Link to="/compare">
            <p className="link">Compare</p>
          </Link>

          <Link to="/watchlist">
            <p className="link">Watchlist</p>
          </Link>
          <Link to="/dashboard">
            <p className="link">Dashboard</p>
          </Link>

          <Switch
            checked={!mode}
            onClick={(e) => {
              toggleTheme();
            }}
          />
        </div>
      </Drawer>
    </div>
  );
};
export default MobileDrawer;