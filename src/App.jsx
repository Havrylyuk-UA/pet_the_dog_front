import "./App.css";
import Header from "./components/Header/Header";
import ClickBtn from "./components/ClickBtn/ClickBtn";
import ByNeCard from "./components/ByNeCard/ByNeCard";

function App() {
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
      <Header />
      <ClickBtn />
      <ByNeCard />
    </div>
  );
}

export default App;
