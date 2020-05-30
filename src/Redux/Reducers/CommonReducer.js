const initialState = {
  isFetching: false,
  menuList: [],
  count : 0,
};

export default function CommonReducer(state = initialState, action) {
  switch (action.type) {
    case "onMenuList":
      return {
        ...state,
        isFetching: true
      };
    case "onMenuListSuccess":
      return {
        ...state,
        isFetching: false,
        menuList: action.menuList
      };
    case "onMenuListFailure":
      return {
        ...state,
        isFetching: false,
      };
    // count
    case "onCount":
      return {
        ...state,
        isFetching: true
      };
    case "onCountSuccess":
      return {
        ...state,
        isFetching: false,
        onCount: action.onCount
      };
    case "onCountFailure":
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}