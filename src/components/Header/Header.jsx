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
      <span>Energy: {Math.round(user.energy)}</span>
      <span>Gold: {user.balance.gold}</span>
      <span>Diamond: {user.balance.gems}</span>
      <span>Per Click: {user.perClick}</span>
      <span>Per Second: {user.perSecond}</span>
    </div>
  );
};

export default Header;
