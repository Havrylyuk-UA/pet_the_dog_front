import { useDispatch, useSelector } from "react-redux";
import {
  addBalance,
  removeEnergy,
  addEnergy,
  accrualBalance,
  removeBalance,
  upgradeUserClick,
  userUpdExp,
  userActiveAutoClick,
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

  useEffect(() => {
    const autoclickInterval = setInterval(() => {
      if (user.energy < 1) return;

      if (user.autoclick) {
        const actualClickValue =
          user.energy < user.perClick ? Math.floor(user.energy) : user.perClick;

        dispatch(removeEnergy(actualClickValue));
        dispatch(addBalance({ currencyType: "coin", pay: actualClickValue }));
      }
    }, 5000);

    return () => clearInterval(autoclickInterval);
  }, [user.energy, user.perClick, user.autoclick, dispatch]);

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

  const handleResetLS = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset? This action cannot be undone."
    );

    if (isConfirmed) {
      await persistor.purge();
      localStorage.clear();
      window.location.reload();
    }
  };

  const activeAutoClick = (currencyType, pay) => {
    dispatch(removeBalance({ currencyType, pay }));
    dispatch(userActiveAutoClick());
  };

  const isEnoughCoinToByUpd = user.balance.coin >= user.updPerClickCost;
  const isEnoughCoinToByAuto =
    user.balance.coin >= user.autoClickCost && !user.autoclick;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <button onClick={() => handleAddBalance("coin", user.perClick)}>
        Buy
      </button>
      <button
        onClick={() => activeAutoClick("coin", user.perClick)}
        disabled={!isEnoughCoinToByAuto}
      >
        Autoclick: {user.autoClickCost} coin`s
      </button>
      <button
        onClick={() => constHandleUpdClick("coin", user.updPerClickCost)}
        disabled={!isEnoughCoinToByUpd}
      >
        Upd Click: {user.updPerClickCost.toFixed(0)} coin`s
      </button>
      <button type="button" onClick={handleResetLS}>
        Reset
      </button>
    </div>
  );
};

export default ClickBtn;
