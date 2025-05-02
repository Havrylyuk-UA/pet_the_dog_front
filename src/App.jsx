import Header from "./components/Header/Header";
import ClickBtn from "./components/ClickBtn/ClickBtn";
import ArmyList from "./components/ArmyList/ArmyList";
import css from "./index.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/user/selectors";

function App() {
  const theme = useSelector(themeSelector);

  return (
    <div
      className={clsx(css.main_container, {
        [css.main_container_dark]: theme === "dark",
        [css.main_container_light]: theme === "light",
        [css.main_container_colored]: theme === "colored",
      })}
    >
      <Header />
      <ClickBtn />
      <ArmyList />
    </div>
  );
}

export default App;
