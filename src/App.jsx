import Header from "./components/Header/Header";
import ClickBtn from "./components/ClickBtn/ClickBtn";
import ArmyList from "./components/ArmyList/ArmyList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        height: "95vh",
      }}
    >
      <Header />
      <ClickBtn />
      <ArmyList />
    </div>
  );
}

export default App;
