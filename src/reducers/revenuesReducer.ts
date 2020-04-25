import { RevenuesState, Revenue } from "../interfaces/revenueInterfaces";

const defaultState: RevenuesState = {
  byMonth: {
    "2020-4": [
      {
        amount: "1234.56",
        description: "Payroll Income",
        date: "2020-04-11",
      },
    ],
  },
};

const revenuesReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "GET_REVENUES":
      const revenuesByMonth = action.payload.reduce(
        (accum: any, revenue: Revenue) => {
          const monthString = revenue.date.slice(0, 7);
          if (!accum[monthString]) {
            accum[monthString] = [];
          }
          accum[monthString].push(revenue);

          return accum;
        },
        {}
      );

      return {
        ...state,
        byMonth: revenuesByMonth,
      };
    case "NEW_REVENUE":
      const monthString = action.payload.date.slice(0, 7);

      return {
        ...state,
        byMonth: {
          ...state.byMonth,
          [monthString]: [action.payload, ...state.byMonth[monthString]],
        },
      };
    case "PURGE_REVENUES":
      return defaultState;
    default:
      return state;
  }
};

export default revenuesReducer;
