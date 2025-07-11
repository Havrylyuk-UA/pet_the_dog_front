import { createSlice } from "@reduxjs/toolkit";

import unitsData from "../../db/army.json";

const initialState = unitsData;

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
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
  },
});

export const { upgradeUnit, buyNewUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
