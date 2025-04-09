import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";
import ArmyListItem from "../ArmyListItem/ArmyListItem";
import { removeBalance } from "../../redux/user/userSlice";

const ArmyList = () => {
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleBuyItem = (currencyType, pay) => {
    dispatch(removeBalance({ currencyType, pay }));
  };

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {user.army.map((unit, index) => (
        <li key={index}>
          <ArmyListItem
            unit={unit}
            buyItem={() => handleBuyItem("gold", unit.price)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArmyList;
