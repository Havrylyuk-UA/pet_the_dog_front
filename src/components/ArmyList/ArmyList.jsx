import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";
import ArmyListItem from "../ArmyListItem/ArmyListItem";
import {
  buyNewUnit,
  removeBalance,
  updatePerSecond,
  upgradeUnit,
} from "../../redux/user/userSlice";

const ArmyList = () => {
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleBuyItem = (currencyType, pay, name) => {
    if (user.balance[currencyType] < pay) return;

    dispatch(removeBalance({ currencyType, pay }));
    dispatch(buyNewUnit({ name }));
    dispatch(updatePerSecond());
  };

  const handleBuyUpdUnit = (unit, currencyType, pay) => {
    dispatch(upgradeUnit(unit));
    dispatch(removeBalance({ currencyType, pay }));
    dispatch(updatePerSecond());
  };

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {user.army.map((unit, i) => (
        <li key={i} style={{ listStyle: "none" }}>
          <ArmyListItem
            unit={unit}
            buyItem={() => handleBuyItem(unit.currency, unit.price, unit.name)}
            updUnit={() =>
              handleBuyUpdUnit(unit, unit.currency, unit.armyUpgradeCost)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ArmyList;
