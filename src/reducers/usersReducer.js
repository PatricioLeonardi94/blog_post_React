export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_USER":
          //agregamos action.payload a un nuevo vector
        return [...state, action.payload];
      default:
        return state;
    }
  };
  