import "./App.css";
import Header from "./components/Header/Header";
import ClickBtn from "./components/ClickBtn/ClickBtn";
import ByNeCard from "./components/ByNeCard/ByNeCard";

import { useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(10);
  const [card, setCard] = useState(0);

  const cardRef = useRef(card);

  useEffect(() => {
    cardRef.current = card * 0.1;
  }, [card]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + cardRef.current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const buyNewCard = () => {
    if (count < price) {
      alert("Not enough money");
      return;
    }

    const newPrice = price * 1.5;

    setCount((prev) => prev - price);
    setPrice(Math.round(newPrice));
    setCard((prev) => prev + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
      }}
    >
      <Header count={count} card={card} />
      <ClickBtn click={addCount} />
      <ByNeCard click={buyNewCard} price={price} />
    </div>
  );
}

export default App;
