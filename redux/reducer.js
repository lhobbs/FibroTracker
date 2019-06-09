export const GET_FOOD = 'fibrotracker/food/LOAD';
export const GET_FOOD_SUCCESS = 'fibrotracker/food/LOAD_SUCCESS';
export const GET_FOOD_FAIL = 'fibrotracker/food/LOAD_FAIL';

export default function reducer(state = { food: [] }, action) {
  switch (action.type) {
    case GET_FOOD:
      return { ...state, loading: true };
    case GET_FOOD_SUCCESS:
      return { ...state, loading: false, food: action.payload.data };
    case GET_FOOD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching food entries'
      };
    default:
      return state;
  }
}

export function listFood(date) {
  return {
    type: GET_FOOD,
    payload: {
      request: {
        url: `/getFood`
      }
    }
  };
}