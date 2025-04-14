import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";

const ArmyListItem = ({ unit, buyItem }) => {
  const user = useSelector(userSelector);

  const isEnoughtGold = user.balance.gold >= unit.armyUpgradeCost;

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <strong>{unit.name}</strong> — Price: {Math.floor(unit.price)}, Gold/s:
      {unit.income}, Count: {unit.count}
      <button onClick={() => buyItem()}>Buy</button>
      <button disabled={!isEnoughtGold}>Upgrade: {unit.armyUpgradeCost}</button>
    </div>
  );
};

export default ArmyListItem;
