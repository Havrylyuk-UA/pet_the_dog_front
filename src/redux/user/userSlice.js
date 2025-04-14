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

      switch (currencyType) {
        case "cooper":
          state.balance.cooper += pay;
          break;
        case "silver":
          state.balance.silver += pay;
          break;
        case "gold":
          state.balance.gold += pay;
          break;
        case "gems":
          state.balance.gems += pay;
          break;
        default:
          break;
      }
    },
    removeBalance: (state, action) => {
      const { currencyType, pay } = action.payload;
      if (currencyType === "cooper") {
        state.balance.cooper -= pay;
      }
      if (currencyType === "silver") {
        state.balance.silver -= pay;
      }
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
    upgradeUnit: (state, action) => {
      const { name } = action.payload;

      const unit = state.army.find((u) => u.name === name);

      unit.armyLvl += 1;
      unit.armyUpgradeCost = unit.armyUpgradeCost * unit.upgradeMultiplier;
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
