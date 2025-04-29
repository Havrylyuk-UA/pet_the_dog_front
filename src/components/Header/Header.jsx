import { useSelector } from "react-redux";
import { themeSelector, userSelector } from "../../redux/user/selectors";
import clsx from "clsx";
import css from "./Header.module.scss";

const Header = () => {
  const user = useSelector(userSelector);
  const theme = useSelector(themeSelector);

  const totalCopper = user.balance.coin;

  const copperInSilver = 1000;
  const silverInGold = 1000;

  const gold = Math.floor(totalCopper / (copperInSilver * silverInGold));
  const silver = Math.floor(
    (totalCopper % (copperInSilver * silverInGold)) / copperInSilver
  );
  const copper = totalCopper % copperInSilver;

  return (
    <div
      className={clsx(css.header_container, {
        [css.header_container_dark]: theme === "dark",
        [css.header_container_light]: theme === "light",
        [css.header_container_colored]: theme === "colored",
      })}
    >
      <span>Name: {user.profile}</span>
      <span>Level: {user.lvl}</span>
      <span>
        <label htmlFor="file">XP progress:</label> {Math.floor(user.xp)}{" "}
        <progress max={user.xpToLevelUp} value={user.xp}>
          {((user.xp / user.xpToLevelUp) * 100).toFixed(0)}%
        </progress>{" "}
        {user.xpToLevelUp}
      </span>
      <span>
        Energy:
        {Math.floor(user.energy)}{" "}
        <progress max={user.limitEnergy} value={user.energy}>
          {((user.energy / user.limitEnergy) * 100).toFixed(0)}%
        </progress>{" "}
        {user.limitEnergy}
      </span>
      <span>
        Cooper: {Math.floor(copper)}, Silver: {Math.floor(silver)}, Gold:
        {Math.floor(gold)}
      </span>
      <span>Diamond: {user.balance.gems}</span>
      <span>Per Click: {user.perClick}</span>
      <span>Income: {user.perSecond.toFixed(3)}/s</span>
    </div>
  );
};

export default Header;
