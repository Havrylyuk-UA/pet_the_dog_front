import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";

const Header = () => {
  const user = useSelector(userSelector);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span>Name: {user.profile}</span>
      <span>Level: {user.lvl}</span>
      <span>XP: {user.xp}</span>
      <span>NextLVL: {user.xpToLevelUp}</span>
      <span>Energy: {Math.floor(user.energy)}</span>
      <span>
        Cooper: {user.balance.cooper}, Silver: {user.balance.silver}, Gold:
        {user.balance.gold}
      </span>
      <span>Diamond: {user.balance.gems}</span>
      <span>Per Click: {user.perClick}</span>
      <span>Per Second: {user.perSecond.toFixed(3)}/s</span>
    </div>
  );
};

export default Header;
