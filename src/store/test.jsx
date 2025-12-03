// // 1 Make a Reducer function, in prams it take two thing state=initialState and action
// // 2 Then create a initialState and assign it to reducer function state prams.InitialState is a object.
// //3 Then define action (means what action you want to perform)

// import { createStore } from "redux";

// const ACTION_ADD = "expenses/add";
// const ACTION_DELETE = "expenses/delete";
// const ACTION_UPDATE = "expenses/update";

// const initialState = {
//   expenses: [],
// };

// const expensesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ACTION_ADD:
//       return {
//         ...state,
//         expenses: [...state.expenses, action.payload],
//       };

//     case ACTION_DELETE:
//       return {
//         ...state,
//         expenses: state.expenses.filter((elem, idx) => idx !== action.payload),
//       };

//     case ACTION_UPDATE:
//       const newUpdatedExpenses = state.expenses.map((elem, idx) => {
//         if (idx === action.payload.id) {
//           return { ...elem, ...action.payload.newUpdatedExpenses };
//         }
//         return elem;
//       });

//       return {
//         ...state,
//         expenses: newUpdatedExpenses,
//       };

//     default:
//       return state;
//   }
// };

// export const store = createStore(expensesReducer);

// // ACTION CREATORS
// export const addExpense = (data) => ({
//   type: ACTION_ADD,
//   payload: data,
// });

// export const deleteExpense = (id) => ({
//   type: ACTION_DELETE,
//   payload: id,
// });

// export const updateExpense = (id, newUpdatedExpenses) => ({
//   type: ACTION_UPDATE,
//   payload: { id, newUpdatedExpenses },
// });
