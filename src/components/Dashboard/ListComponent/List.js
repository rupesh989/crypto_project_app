import React, { useEffect, useState } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "./styles.css";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { convertNumbers } from "../../../functions/convertNumber";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import IconButton from "@mui/material/IconButton";
import { addToWatchlist, removeFromWatchlist } from "../../../functions";
import { Link } from "react-router-dom";

function List({ coin, delay }) {
  const isWatchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").includes(coin.id)
    : false;
  const [volume, setVolume] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setVolume(convertNumbers(parseInt(coin.total_volume)));
  }, [coin.total_volume]);

  const handleAddToWatchlist = () => {
    setIsAdded(true);
    addToWatchlist(coin.id);
  };

  const handleRemoveFromWatchlist = () => {
    setIsAdded(false);
    removeFromWatchlist(coin.id);
  };

  return (
    <motion.tr
      className="list-row"
      initial={{ x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      
      <td className="td-img">
        <Tooltip title="Logo">
          <Link to={`/coin/${coin.id}`}>
            <img src={coin.image} className="coin-logo" alt={`${coin.name} logo`} />
          </Link>
        </Tooltip>
      </td>
      <td className="td-name-flex">
        <Link to={`/coin/${coin.id}`}>
          <div className="name-flex">
            <Tooltip title="Symbol">
              <p className="coin-symbol name-text">{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className="coin-name name-text">{coin.name}</p>
            </Tooltip>
          </div>
        </Link>
      </td>
      <td className="td-chip-flex">
        <Tooltip title="Percentage Change in 24 Hours">
          <div className="chip-flex">
            <div className={`coin-chip percentage-text ${coin.price_change_percentage_24h > 0 ? '' : 'chip-red'}`}>
              {coin.price_change_percentage_24h.toFixed(2) + " %"}
            </div>
            {coin.price_change_percentage_24h > 0 ? (
              <TrendingUpRoundedIcon className="icon chip-icon" />
            ) : (
              <TrendingDownRoundedIcon className="icon chip-red chip-icon" />
            )}
          </div>
        </Tooltip>
      </td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <Tooltip title="Price">
            <p
              className="coin-price name-text"
              style={{
                color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
              }}
            >
              $ {coin.current_price.toLocaleString()}
            </p>
          </Tooltip>
        </Link>
      </td>
      <td className="td-mkt-cap">
        <Link to={`/coin/${coin.id}`}>
          <Tooltip title="Total Volume">
            <p>${coin.total_volume.toLocaleString()}</p>
          </Tooltip>
        </Link>
      </td>
      <td className="td-mkt-cap">
        <Link to={`/coin/${coin.id}`}>
          <Tooltip title="Market Capital">
            <p>${coin.market_cap.toLocaleString()}</p>
          </Tooltip>
        </Link>
      </td>
      <td className="td-vol-cap">
        <Link to={`/coin/${coin.id}`}>
          <Tooltip title="Volume">
            <p>${volume}</p>
          </Tooltip>
        </Link>
      </td>
      <td>
        <div className="bookmark-icon-div" onClick={isWatchlist || isAdded ? handleRemoveFromWatchlist : handleAddToWatchlist}>
          <IconButton>
            {isWatchlist || isAdded ? (
              <BookmarkRoundedIcon className="bookmark-icon" />
            ) : (
              <BookmarkBorderRoundedIcon className="bookmark-icon" />
            )}
          </IconButton>
        </div>
      </td>
    </motion.tr>
  );
}

export default List;
