import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";

const ArmyListItem = ({ unit, buyItem, updUnit }) => {
  const user = useSelector(userSelector);

  const isEnoughtCoinToBy = user.balance.coin >= unit.price;
  const isEnoughtCoinToUpgrade =
    unit.count > 0 && user.balance.coin >= unit.armyUpgradeCost;

  return (
    <div>
      <strong>{unit.name}</strong> — Inc/s:
      {unit.income}, Count: {unit.count}, lvl {unit.armyLvl}
      <button onClick={() => buyItem()} disabled={!isEnoughtCoinToBy}>
        Buy {Math.floor(unit.price)}
      </button>
      <button onClick={() => updUnit()} disabled={!isEnoughtCoinToUpgrade}>
        Upgrade: {Math.floor(unit.armyUpgradeCost)}
      </button>
    </div>
  );
};

export default ArmyListItem;
