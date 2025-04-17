import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";
import ArmyListItem from "../ArmyListItem/ArmyListItem";
import { removeBalance, updatePerSecond } from "../../redux/user/userSlice";

const ArmyList = () => {
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleBuyItem = (currencyType, pay, perSec, name) => {
    if (user.balance[currencyType] < pay) {
      console.log("Error");

      return;
    }

    dispatch(removeBalance({ currencyType, pay }));
    dispatch(updatePerSecond({ perSec, name }));
  };

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {user.army.map((unit, i) => (
        <li key={i} style={{ listStyle: "none" }}>
          <ArmyListItem
            unit={unit}
            buyItem={() =>
              handleBuyItem(unit.currency, unit.price, unit.income, unit.name)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ArmyList;
