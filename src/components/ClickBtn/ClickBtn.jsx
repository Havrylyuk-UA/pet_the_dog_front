import { useDispatch, useSelector } from "react-redux";
import {
  addBalance,
  removeEnergy,
  addEnergy,
  accrualBalance,
} from "../../redux/user/userSlice";
import { userSelector } from "../../redux/user/selectors";
import { useEffect } from "react";

const ClickBtn = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (user.energy < user.limitEnergy) {
        const newEnergy = user.energy + 0.1;
        const limitedEnergy = Math.min(newEnergy, user.limitEnergy);
        dispatch(addEnergy(limitedEnergy - user.energy));
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [user.energy, user.limitEnergy, dispatch]);

  useEffect(() => {
    const perSecInterval = setInterval(() => {
      dispatch(accrualBalance(user.perSecond));
    }, 1000);

    return () => clearInterval(perSecInterval);
  }, [dispatch, user.perSecond]);

  const handleAddBalance = (currencyType, pay) => {
    if (user.energy < 1) {
      return;
    }

    dispatch(removeEnergy(pay));
    dispatch(addBalance({ currencyType, pay }));
  };

  return (
    <div>
      <button onClick={() => handleAddBalance("gold", 1)}>Pet</button>
    </div>
  );
};

export default ClickBtn;
