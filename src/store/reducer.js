const storeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATES":
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      throw new Error("Unhandled action type");
  }
};

export default storeReducer;
