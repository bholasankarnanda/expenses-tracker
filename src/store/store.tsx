import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Expense {
  amount: number;
  title: string;
}

export interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },

    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (_, idx) => idx !== action.payload
      );
    },

    updateExpense: (
      state,
      action: PayloadAction<{ id: number; updatedExpense: Partial<Expense> }>
    ) => {
      const { id, updatedExpense } = action.payload;

      if (state.expenses[id]) {
        state.expenses[id] = { ...state.expenses[id], ...updatedExpense };
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export const store = configureStore({
  reducer: {
    expenses: expensesSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
