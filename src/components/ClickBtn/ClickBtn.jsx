import { useDispatch, useSelector } from "react-redux";
import {
  addBalance,
  removeEnergy,
  addEnergy,
  accrualBalance,
  removeBalance,
  upgradeUserClick,
  userUpdExp,
} from "../../redux/user/userSlice";
import { userSelector } from "../../redux/user/selectors";
import { useEffect } from "react";
import { persistor } from "../../redux/store";

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
      dispatch(userUpdExp());
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

  const constHandleUpdClick = () => {
    if (user.balance.coin < user.updPerClickCost) {
      return;
    }

    dispatch(removeBalance("coin", user.updPerClickCost));
    dispatch(upgradeUserClick());
  };

  const handleResetLS = () => {
    persistor.purge(); // очищає localStorage
    window.location.reload(); // щоб примусово перезавантажити та застосувати очищення
  };

  // const isEnoughCoinToByUpd = user.balance.coin >= user.updPerClickCost;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <button onClick={() => handleAddBalance("coin", user.perClick)}>
        Buy
      </button>
      <button
        onClick={() => constHandleUpdClick()}
        // disabled={!isEnoughCoinToByUpd}
        disabled
      >
        Upd Click: {user.updPerClickCost.toFixed(0)} coin
      </button>
      <button type="button" onClick={handleResetLS}>
        Reset
      </button>
    </div>
  );
};

export default ClickBtn;
