import { useDispatch, useSelector } from "react-redux";
import { themeSelector, userSelector } from "../../redux/user/selectors";
import { handleChangeTheme } from "../../redux/user/userSlice";
import clsx from "clsx";
import css from "./Header.module.scss";

const Header = () => {
  const user = useSelector(userSelector);
  const theme = useSelector(themeSelector);

  const dispath = useDispatch();

  const totalCopper = user.balance.coin;

  const copperInSilver = 1000;
  const silverInGold = 1000;

  const gold = Math.floor(totalCopper / (copperInSilver * silverInGold));
  const silver = Math.floor(
    (totalCopper % (copperInSilver * silverInGold)) / copperInSilver
  );
  const copper = totalCopper % copperInSilver;

  const handleChangeThemeClick = (theme) => {
    if (theme === "dark") {
      dispath(handleChangeTheme("light"));
    }
    if (theme === "light") {
      dispath(handleChangeTheme("colored"));
    }
    if (theme === "colored") {
      dispath(handleChangeTheme("dark"));
    } else return;
  };

  return (
    <div
      className={clsx(css.header_container, {
        [css.header_container_dark]: theme === "dark",
        [css.header_container_light]: theme === "light",
        [css.header_container_colored]: theme === "colored",
      })}
    >
      <div className={css.header_profile}>
        <span>Name: {user.profile}</span>
        <span>Level: {user.lvl}</span>
        <div className={css.heaer_progressbar}>
          <span>
            <label htmlFor="file">XP:</label> {Math.floor(user.xp)}{" "}
            <progress max={user.xpToLevelUp} value={user.xp}>
              {((user.xp / user.xpToLevelUp) * 100).toFixed(0)}%
            </progress>{" "}
            {user.xpToLevelUp}
          </span>
          <span>
            Energy: {Math.floor(user.energy)}{" "}
            <progress max={user.limitEnergy} value={user.energy}>
              {((user.energy / user.limitEnergy) * 100).toFixed(0)}%
            </progress>{" "}
            {user.limitEnergy}
          </span>
        </div>
      </div>
      <div className={css.header_balance}>
        <span>Per Click: {user.perClick}</span>
        <span>Income: {user.perSecond.toFixed(3)}/s</span>
        <span>
          Cooper: {Math.floor(copper)}, Silver: {Math.floor(silver)}, Gold:
          {Math.floor(gold)}
        </span>
        <span>Diamond: {user.balance.gems}</span>
      </div>
      <div className={css.header_theme_btn}>
        <button type="button" onClick={() => handleChangeThemeClick(theme)}>
          Change theme
        </button>
      </div>
    </div>
  );
};

export default Header;
