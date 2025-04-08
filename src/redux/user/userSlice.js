import { createSlice } from "@reduxjs/toolkit";

import userData from "../../db/user.json";

const initialState = userData[0];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
  },
});

export const { addBalance, removeBalance, removeEnergy, addEnergy } =
  userSlice.actions;

export default userSlice.reducer;
