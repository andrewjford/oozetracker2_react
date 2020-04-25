import { RevenuesState, Revenue } from "../interfaces/revenueInterfaces";

const getMonthString = (date: string): string => {
  let dateString = date.slice(0, 7);

  if (dateString[5] === "0") {
    dateString = dateString.slice(0, 5) + dateString[6];
  }

  return dateString;
};

const defaultState: RevenuesState = {
  byMonth: {},
  fetched: false,
};

const revenuesReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "GET_REVENUES":
      const revenuesByMonth = action.payload.reduce(
        (accum: any, revenue: Revenue) => {
          const monthString = getMonthString(revenue.date);
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
        fetched: true,
      };
    case "NEW_REVENUE":
      const monthString = getMonthString(action.payload.date);

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
