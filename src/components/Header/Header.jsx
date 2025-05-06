import { useDispatch, useSelector } from "react-redux";
import { themeSelector, userSelector } from "../../redux/user/selectors";
import { handleChangeTheme } from "../../redux/user/userSlice";
import clsx from "clsx";
import css from "./Header.module.scss";

const Header = () => {
  const user = useSelector(userSelector);
  const theme = useSelector(themeSelector);

  const dispatch = useDispatch();

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
      dispatch(handleChangeTheme("light"));
    } else if (theme === "light") {
      dispatch(handleChangeTheme("colored"));
    } else if (theme === "colored") {
      dispatch(handleChangeTheme("dark"));
    }
  };

  const finalBalance = (totalCopper) => {
    if (silver > silverInGold) {
      return (
        <span>
          <span className={css.header_gold}>Gold</span>: {gold.toFixed(0)}
        </span>
      );
    } else if (totalCopper >= copperInSilver) {
      return (
        <span>
          <span className={css.header_silver}>Silver</span>: {silver.toFixed(0)}
        </span>
      );
    } else {
      return (
        <span>
          <span className={css.header_cooper}>Cooper</span>: {copper.toFixed(0)}
        </span>
      );
    }
  };

  const balance = finalBalance();

  return (
    <div
      className={clsx(css.header_container, {
        [css.header_container_dark]: theme === "dark",
        [css.header_container_light]: theme === "light",
        [css.header_container_colored]: theme === "colored",
      })}
    >
      <div className={clsx(css.header_panel, css.d_f)}>
        <div className={clsx(css.header_profile, css.d_f)}>
          <div className={clsx(css.header_name_container, css.d_f)}>
            <div className={css.header_name}>
              <span>{user.profile}</span>
            </div>
            <div className={clsx(css.header_name_info, css.d_f_c)}>
              <span>Level: {user.lvl}</span>
              <span>Per Click: {user.perClick}</span>
            </div>
          </div>
          <div className={clsx(css.header_progressbar, css.d_f_c)}>
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
        <div className={clsx(css.header_balance, css.d_f)}>
          {balance}
          <span className={css.header_diamond}>Diamond:</span>{" "}
          {user.balance.gems}
        </div>
        <div>
          <button
            className={clsx(css.header_theme_btn, {
              [css.header_theme_btn_d]: theme === "dark",
              [css.header_theme_btn_l]: theme === "light",
              [css.header_theme_btn_c]: theme === "colored",
            })}
            type="button"
            onClick={() => handleChangeThemeClick(theme)}
          >
            Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
