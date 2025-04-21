import { createSlice } from "@reduxjs/toolkit";

import userData from "../../db/user.json";

const initialState = userData[0];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accrualBalance: (state) => {
      state.balance.coin += state.perSecond;
    },
    addBalance: (state, action) => {
      const { currencyType, pay } = action.payload;
      if (state.balance[currencyType] !== undefined) {
        state.balance[currencyType] += pay;
      }
    },
    removeBalance: (state, action) => {
      const { currencyType, pay } = action.payload;
      if (state.balance[currencyType] !== undefined) {
        state.balance[currencyType] -= pay;
      }
    },
    addEnergy: (state, action) => {
      state.energy += action.payload;
    },
    removeEnergy: (state, action) => {
      state.energy -= action.payload;
    },
    updatePerSecond: (state) => {
      let totalIncome = 0;

      for (const unit of state.army) {
        totalIncome += unit.count * unit.income * unit.armyLvl;
      }

      state.perSecond = Number(totalIncome.toFixed(6));
    },
    buyNewUnit: (state, action) => {
      const { name } = action.payload;

      const unit = state.army.find((u) => u.name === name);

      unit.count += 1;
      unit.price = unit.price * 1.25;
    },
    upgradeUnit: (state, action) => {
      const { name } = action.payload;

      const unit = state.army.find((u) => u.name === name);

      if (!unit) return;

      const prevIncome = unit.income * unit.count;
      const removePrevPerSec = state.perSecond - prevIncome;

      unit.armyLvl += 1;
      const newIncome = unit.income * unit.armyLvl * unit.count;
      unit.armyUpgradeCost = unit.armyUpgradeCost * 1.75;

      state.perSecond = removePrevPerSec + newIncome;
    },
    upgradeUserClick: (state) => {
      state.updPerClickCost = state.updPerClickCost * 2.75;
      state.perClick += 1;
    },
    userUpdExp: (state) => {
      if (state.xp >= state.xpToLevelUp) {
        state.lvl += 1;
        state.xp = 0;
        state.xpToLevelUp = state.xpToLevelUp * 2;
        state.limitEnergy += 5;
      }
      if (state.lvl <= 5) {
        state.xp += state.perSecond * 0.1;
      }
      if (state.lvl <= 10) {
        state.xp += state.perSecond * 0.01;
      }
      if (state.lvl <= 15) {
        state.xp += state.perSecond * 0.001;
      }
      if (state.lvl <= 30) {
        state.xp += state.perSecond * 0.0001;
      } else {
        state.xp += state.perSecond * 0.00001;
      }
    },
    userActiveAutoClick: (state) => {
      state.autoclick = true;
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
  upgradeUserClick,
  userUpdExp,
  upgradeUnit,
  buyNewUnit,
  userActiveAutoClick,
} = userSlice.actions;

export default userSlice.reducer;
