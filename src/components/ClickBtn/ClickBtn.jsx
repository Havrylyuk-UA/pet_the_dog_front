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
    if (user.energy < 1) return;

    const actualPay =
      user.perClick > user.energy ? Math.floor(user.energy) : pay;

    dispatch(removeEnergy(actualPay));
    dispatch(addBalance({ currencyType, pay: actualPay }));
  };

  const constHandleUpdClick = (currencyType, pay) => {
    if (user.balance.coin < user.updPerClickCost) {
      return;
    }

    dispatch(removeBalance({ currencyType, pay }));
    dispatch(upgradeUserClick());
  };

  const handleResetLS = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset? This action cannot be undone."
    );

    if (isConfirmed) {
      persistor.purge();
      window.location.reload();
    }
  };

  const isEnoughCoinToByUpd = user.balance.coin >= user.updPerClickCost;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <button onClick={() => handleAddBalance("coin", user.perClick)}>
        Buy
      </button>
      <button
        onClick={() => constHandleUpdClick("coin", user.updPerClickCost)}
        disabled={!isEnoughCoinToByUpd}
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
