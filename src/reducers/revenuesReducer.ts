import { RevenuesState } from "../interfaces/revenueInterfaces";

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
      return {
        ...state,
        revenues: action.payload,
      };
    case "PURGE_REVENUES":
      return defaultState;
    default:
      return state;
  }
};

export default revenuesReducer;
