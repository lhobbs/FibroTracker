import axios from 'axios';

/*********   FOOD ACTION   **********/
export const GET_FOOD = 'fibrotracker/food/LOAD';
export const GET_FOOD_SUCCESS = 'fibrotracker/food/LOAD_SUCCESS';
export const GET_FOOD_FAIL = 'fibrotracker/food/LOAD_FAIL';

export const SAVE_FOOD = 'fibrotracker/food/SAVE_FOOD';
export const SAVE_FOOD_SUCCESS = 'fibrotracker/food/SAVE_FOOD_SUCCESS';
export const SAVE_FOOD_FAIL = 'fibrotracker/food/SAVE_FOOD_FAIL';

export const GET_FOOD_ITEM = 'fibrotracker/food/LOAD_ITEM';
export const GET_FOOD_ITEM_SUCCESS = 'fibrotracker/food/LOAD_ITEM_SUCCESS';
export const GET_FOOD_ITEM_FAIL = 'fibrotracker/food/LOAD_ITEM_FAIL';

/*********   MEDICINE ACTION   **********/
export const GET_MEDICINE = 'fibrotracker/medicine/LOAD';
export const GET_MEDICINE_SUCCESS = 'fibrotracker/medicine/LOAD_SUCCESS';
export const GET_MEDICINE_FAIL = 'fibrotracker/medicine/LOAD_FAIL';

export const SAVE_MEDICINE = 'fibrotracker/medicine/SAVE_MEDICINE';
export const SAVE_MEDICINE_SUCCESS = 'fibrotracker/medicine/SAVE_MEDICINE_SUCCESS';
export const SAVE_MEDICINE_FAIL = 'fibrotracker/medicine/SAVE_MEDICINE_FAIL';

export default function reducer(state = { food: [] }, action) {
  switch (action.type) {
    case GET_FOOD:
      return { ...state, loading: true };
    case GET_FOOD_SUCCESS:
      const foods = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, food: foods };
    case GET_FOOD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching food entries'
      };
      case SAVE_FOOD:
        // console.log(action.payload, 'action')
        return { ...state, loading: true };
    case SAVE_FOOD_SUCCESS:
    //   console.log('success', action.payload.data, state.food)
      return { ...state, loading: false, food: [...state.food, action.payload.data] }
    case SAVE_FOOD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding food entry'
      };

      case GET_MEDICINE:
      return { ...state, loading: true };
    case GET_MEDICINE_SUCCESS:
      const meds = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, meds: meds };
    case GET_MEDICINE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching medicine entries'
      };
      case SAVE_MEDICINE:
        // console.log(action.payload, 'action')
        return { ...state, loading: true };
    case SAVE_MEDICINE_SUCCESS:
    //   console.log('success', action.payload.data, state.food)
      return { ...state, loading: false, meds: [...state.meds, action.payload.data] }
    case SAVE_MEDICINE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding med entry'
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

export function saveFood(food) {
    // console.log('food', food)
    return {
        type: SAVE_FOOD,
        payload: {
            request: {
                url: '/addFood',
                data: food,
                method: 'POST'
            }
        }
    }
    // return (dispatch) => {
    //     return axios.post(`/addFood`, food)
    //       .then(response => {
    //           console.log(response.data, 'response')
    //         dispatch(saveFoodSuccess(response.data))
    //       })
    //       .catch(error => {
    //           console.log(error)
    //         throw(error);
    //       });
    //   };
}

export const saveFoodSuccess = food => {
    return {
      type: SAVE_FOOD_SUCCESS,
      payload: {
        food
      }
    }
  }

  export function listMedicine(date) {
    return {
      type: GET_MEDICINE,
      payload: {
        request: {
          url: `/getMedicine`
        }
      }
    };
  }
  
  export function saveMedicine(med) {
      // console.log('food', food)
      return {
          type: SAVE_MEDICINE,
          payload: {
              request: {
                  url: '/addMedicine',
                  data: med,
                  method: 'POST'
              }
          }
      }
  }