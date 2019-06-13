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

/*********   ACTIVITY ACTION   **********/
export const GET_ACTIVITIES = 'fibrotracker/activity/LOAD';
export const GET_ACTIVITIES_SUCCESS = 'fibrotracker/activity/LOAD_SUCCESS';
export const GET_ACTIVITIES_FAIL = 'fibrotracker/activity/LOAD_FAIL';

export const SAVE_ACTIVITY = 'fibrotracker/activity/SAVE_ACTIVITY';
export const SAVE_ACTIVITY_SUCCESS = 'fibrotracker/activity/SAVE_ACTIVITY_SUCCESS';
export const SAVE_ACTIVITY_FAIL = 'fibrotracker/activity/SAVE_ACTIVITY_FAIL';

/*********   SLEEP ACTION   **********/
export const GET_SLEEP = 'fibrotracker/sleep/LOAD';
export const GET_SLEEP_SUCCESS = 'fibrotracker/sleep/LOAD_SUCCESS';
export const GET_SLEEP_FAIL = 'fibrotracker/sleep/LOAD_FAIL';

export const SAVE_SLEEP = 'fibrotracker/sleep/SAVE_SLEEP';
export const SAVE_SLEEP_SUCCESS = 'fibrotracker/sleep/SAVE_SLEEP_SUCCESS';
export const SAVE_SLEEP_FAIL = 'fibrotracker/sleep/SAVE_SLEEP_FAIL';


export default function reducer(state = { food: [], meds: [], activities: [] }, action) {
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
      // console.log('success', action.payload.data)
      return { ...state, loading: false, meds: [...state.meds, action.payload.data] }
    case SAVE_MEDICINE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding med entry'
      };


    case GET_ACTIVITIES:
      return { ...state, loading: true };
    case GET_ACTIVITIES_SUCCESS:
      const activities = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, activities: activities };
    case GET_ACTIVITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching activity entries'
      };
    case SAVE_ACTIVITY:
        return { ...state, loading: true };
    case SAVE_ACTIVITY_SUCCESS:
      return { ...state, loading: false, activities: [...state.activities, action.payload.data] }
    case SAVE_ACTIVITY_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding activity entry'
      };


    case GET_SLEEP:
      return { ...state, loading: true };
    case GET_SLEEP_SUCCESS:
      const sleep = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, sleep: sleep };
    case GET_SLEEP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching sleep entries'
      };
    case SAVE_SLEEP:
        return { ...state, loading: true };
    case SAVE_SLEEP_SUCCESS:
      return { ...state, loading: false, sleep: [...state.sleep, action.payload.data] }
    case SAVE_SLEEP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding sleep entry'
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

  export function listActivities(date) {
    return {
      type: GET_ACTIVITIES,
      payload: {
        request: {
          url: `/getActivities`
        }
      }
    };
  }
  
  export function saveActivity(activity) {
    // console.log('reduce', activity)
      return {
          type: SAVE_ACTIVITY,
          payload: {
              request: {
                  url: '/addActivity',
                  data: activity,
                  method: 'POST'
              }
          }
      }
  }


  export function listSleep(date) {
    return {
      type: GET_SLEEP,
      payload: {
        request: {
          url: `/getSleep`
        }
      }
    };
  }
  
  export function saveSleep(sleep) {
    // console.log('reduce', activity)
      return {
          type: SAVE_SLEEP,
          payload: {
              request: {
                  url: '/addSleep',
                  data: sleep,
                  method: 'POST'
              }
          }
      }
  }