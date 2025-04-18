import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";

const Header = () => {
  const user = useSelector(userSelector);

  const totalCopper = user.balance.coin;

  const copperInSilver = 1000;
  const silverInGold = 1000;

  const gold = Math.floor(totalCopper / (copperInSilver * silverInGold));
  const silver = Math.floor(
    (totalCopper % (copperInSilver * silverInGold)) / copperInSilver
  );
  const copper = totalCopper % copperInSilver;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span>Name: {user.profile}</span>
      <span>Level: {user.lvl}</span>
      <span>XP: {Math.floor(user.xp)}</span>
      <span>NextLVL: {user.xpToLevelUp}</span>
      <span>Energy: {Math.floor(user.energy)}</span>
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
