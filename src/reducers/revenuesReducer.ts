import {
  RevenuesState,
  Revenue,
  RevenuesMap,
} from "../interfaces/revenueInterfaces";

const getMonthString = (date: string): string => {
  let dateString = date.slice(0, 7);

  if (dateString[5] === "0") {
    dateString = dateString.slice(0, 5) + dateString[6];
  }

  return dateString;
};

const generateByMonthMap = (revenues: Revenue[]): RevenuesMap => {
  return revenues.reduce((accum: RevenuesMap, revenue: Revenue) => {
    const monthString = getMonthString(revenue.date);
    if (!accum[monthString]) {
      accum[monthString] = [];
    }
    accum[monthString].push(revenue);

    return accum;
  }, {});
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
      const revenuesByMonth = generateByMonthMap(action.payload);

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
          [monthString]: [
            action.payload,
            ...(state.byMonth[monthString] ? state.byMonth[monthString] : []),
          ],
        },
      };
    case "UPDATE_REVENUE":
      const updatedRevenueMonthString = getMonthString(action.payload.date);
      const monthRevenues: Revenue[] = state.byMonth[
        updatedRevenueMonthString
      ].map((revenue: Revenue) => {
        if (revenue.id === action.payload.id) {
          return action.payload as Revenue;
        }

        return revenue;
      });

      return {
        ...state,
        byMonth: {
          ...state.byMonth,
          [updatedRevenueMonthString]: monthRevenues,
        },
      };
    case "DELETE_REVENUE":
      const filteredRevenues = Object.values(state.byMonth)
        .flat()
        .filter((revenue) => revenue.id !== action.payload);
      const filteredRevenuesAsMap = generateByMonthMap(filteredRevenues);

      return {
        ...state,
        byMonth: filteredRevenuesAsMap,
      };
    case "PURGE_REVENUES":
      return defaultState;
    default:
      return state;
  }
};

export default revenuesReducer;
