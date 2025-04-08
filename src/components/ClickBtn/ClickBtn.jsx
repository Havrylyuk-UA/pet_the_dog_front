import { useDispatch, useSelector } from "react-redux";
import {
  updateBalance,
  removeEnergy,
  addEnergy,
} from "../../redux/user/userSlice";
import { userSelector } from "../../redux/user/selectors";
import { useEffect } from "react";

const ClickBtn = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.energy < user.limitEnergy) {
        // Додаємо енергію, але не більше, ніж ліміт
        const newEnergy = user.energy + 0.1;
        const limitedEnergy = Math.min(newEnergy, user.limitEnergy);
        dispatch(addEnergy(limitedEnergy - user.energy));
      }
    }, 1000); // 1000 мс = 1 секунда

    return () => clearInterval(interval);
  }, [user.energy, user.limitEnergy, dispatch]);

  const handleAddBalance = (currencyType, pay) => {
    if (user.energy < 1) {
      return alert("Not enough energy");
    }

    dispatch(removeEnergy(pay)); // Віднімання енергії за клік
    dispatch(updateBalance({ currencyType, pay })); // Оновлення балансу
  };

  return (
    <div>
      <button onClick={() => handleAddBalance("gold", 1)}>Pet</button>
    </div>
  );
};

export default ClickBtn;
