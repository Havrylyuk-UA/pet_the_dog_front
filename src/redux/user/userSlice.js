import { createSlice } from "@reduxjs/toolkit";

import userData from "../../db/user.json";

const initialState = userData[0];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accrualBalance: (state) => {
      state.balance.gold += state.perSecond;
    },
    addBalance: (state, action) => {
      const { currencyType, pay } = action.payload;

      if (currencyType === "gold") {
        state.balance.gold += pay;
      } else if (currencyType === "gems") {
        state.balance.gems += pay;
      }
    },
    removeBalance: (state, action) => {
      const { currencyType, pay } = action.payload;

      if (currencyType === "gold") {
        state.balance.gold -= pay;
      } else if (currencyType === "gems") {
        state.balance.gems -= pay;
      }
    },
    addEnergy: (state, action) => {
      state.energy += action.payload;
    },
    removeEnergy: (state, action) => {
      state.energy -= action.payload;
    },
    updatePerSecond: (state, action) => {
      const { perSec, name } = action.payload;

      const unit = state.army.find((u) => u.name === name);

      unit.count += 1;
      unit.price = unit.price * 1.25;

      state.perSecond += perSec;
    },
  },
});

export const {
  accrualBalance,
  addBalance,
  removeBalance,
  removeEnergy,
  addEnergy,
  updatePerSecond,
} = userSlice.actions;

export default userSlice.reducer;
