import { createSlice } from "@reduxjs/toolkit";

import userData from "../../db/user.json";

const initialState = userData[0];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      const { currencyType, pay } = action.payload;

      if (currencyType === "gold") {
        state.balance.gold += pay;
      } else if (currencyType === "gems") {
        state.balance.gems += pay;
      }
    },
    removeEnergy: (state, action) => {
      state.energy -= action.payload;
    },
    addEnergy: (state, action) => {
      state.energy += action.payload;
    },
  },
});

export const { updateBalance, removeEnergy, addEnergy } = userSlice.actions;

export default userSlice.reducer;
