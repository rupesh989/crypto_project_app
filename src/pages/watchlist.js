import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button/Button";
import Footer from "../components/Common/Footer/footer";
import Header from "../components/Common/Header";
import TopButton from "../components/Common/TopButton/topButton";
import Tabs from "../components/Dashboard/Tabs/tabs";
import { get100Coins } from "../functions/get100Coins";
import { Link } from "react-router-dom";

function WatchListPage() {
  const [watchlist, setWatchlist] = useState(() => {
    // Read the initial watchlist from local storage
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? storedWatchlist.split(",") : [];
  });
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (watchlist.length === 0) {
        setCoins([]); // Clear coins if watchlist is empty
        setLoading(false);
        return;
      }

      try {
        const response = await get100Coins();
        const myCoins = response.filter((coin) => watchlist.includes(coin.id));
        setCoins(myCoins);
      } catch (error) {
        setError("Failed to fetch coin data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [watchlist]); // Fetch data when watchlist changes

  // Listen for changes in local storage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedWatchlist = localStorage.getItem("watchlist");
      setWatchlist(storedWatchlist ? storedWatchlist.split(",") : []);
    };

    // Event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div>
      <Header />
      <div>
        {error ? (
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        ) : coins.length > 0 ? (
          <Tabs data={coins} />
        ) : (
          <div style={{ marginBottom: "300px" }}>
            <h1 style={{ textAlign: "center" }}>Your watchlist is Currently Empty</h1>
            <p style={{ textAlign: "center", color: "var(--grey)" }}>
              Please Add Coins to your watchlist
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/dashboard">
                <Button text="Dashboard" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <TopButton />
      <Footer />
    </div>
  );
}

export default WatchListPage;
