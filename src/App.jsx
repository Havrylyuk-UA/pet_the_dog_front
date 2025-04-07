import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ClickBtn from "./components/ClickBtn/ClickBtn";

function App() {
  const [count, setCount] = useState(0);

  const AdCount = () => {
    let total = count + 1;
    setCount(total);
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
      <Header count={count} />
      <ClickBtn click={() => AdCount()} />
    </div>
  );
}

export default App;
