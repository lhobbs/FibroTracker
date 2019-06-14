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


/*********   PAIN SCALE ACTION   **********/
export const GET_PAIN = 'fibrotracker/pain/LOAD';
export const GET_PAIN_SUCCESS = 'fibrotracker/pain/LOAD_SUCCESS';
export const GET_PAIN_FAIL = 'fibrotracker/pain/LOAD_FAIL';

export const SAVE_PAIN = 'fibrotracker/pain/SAVE_PAIN';
export const SAVE_PAIN_SUCCESS = 'fibrotracker/pain/SAVE_PAIN_SUCCESS';
export const SAVE_PAIN_FAIL = 'fibrotracker/pain/SAVE_PAIN_FAIL';

/*********   PAIN AREAS ACTION   **********/
export const GET_PAINAREAS = 'fibrotracker/painareas/LOAD';
export const GET_PAINAREAS_SUCCESS = 'fibrotracker/painareas/LOAD_SUCCESS';
export const GET_PAINAREAS_FAIL = 'fibrotracker/painareas/LOAD_FAIL';

export const SAVE_PAINAREAS = 'fibrotracker/painareas/SAVE_ITEM';
export const SAVE_PAINAREAS_SUCCESS = 'fibrotracker/painareas/SAVE_ITEM_SUCCESS';
export const SAVE_PAINAREAS_FAIL = 'fibrotracker/painareas/SAVE_ITEM_FAIL';


/*********   GENERAL INFO ACTION   **********/
export const GET_GENERALINFO = 'fibrotracker/generalinfo/LOAD';
export const GET_GENERALINFO_SUCCESS = 'fibrotracker/generalinfo/LOAD_SUCCESS';
export const GET_GENERALINFO_FAIL = 'fibrotracker/generalinfo/LOAD_FAIL';

export const SAVE_GENERALINFO = 'fibrotracker/generalinfo/SAVE_ITEM';
export const SAVE_GENERALINFO_SUCCESS = 'fibrotracker/generalinfo/SAVE_ITEM_SUCCESS';
export const SAVE_GENERALINFO_FAIL = 'fibrotracker/generalinfo/SAVE_ITEM_FAIL';


/*********   SYMPTOMS ACTION   **********/
export const GET_SYMPTOMS = 'fibrotracker/symptoms/LOAD';
export const GET_SYMPTOMS_SUCCESS = 'fibrotracker/symptoms/LOAD_SUCCESS';
export const GET_SYMPTOMS_FAIL = 'fibrotracker/symptoms/LOAD_FAIL';

export const SAVE_SYMPTOMS = 'fibrotracker/symptoms/SAVE_ITEM';
export const SAVE_SYMPTOMS_SUCCESS = 'fibrotracker/symptoms/SAVE_ITEM_SUCCESS';
export const SAVE_SYMPTOMS_FAIL = 'fibrotracker/symptoms/SAVE_ITEM_FAIL';


/*********   APPOINTMENTS ACTION   **********/
export const GET_APPOINTMENTS = 'fibrotracker/appointments/LOAD';
export const GET_APPOINTMENTS_SUCCESS = 'fibrotracker/appointments/LOAD_SUCCESS';
export const GET_APPOINTMENTS_FAIL = 'fibrotracker/appointments/LOAD_FAIL';

export const SAVE_APPOINTMENT = 'fibrotracker/appointments/SAVE_ITEM';
export const SAVE_APPOINTMENT_SUCCESS = 'fibrotracker/appointments/SAVE_ITEM_SUCCESS';
export const SAVE_APPOINTMENT_FAIL = 'fibrotracker/appointments/SAVE_ITEM_FAIL';


/*********   NOTES ACTION   **********/
export const GET_NOTES = 'fibrotracker/notes/LOAD';
export const GET_NOTES_SUCCESS = 'fibrotracker/notes/LOAD_SUCCESS';
export const GET_NOTES_FAIL = 'fibrotracker/notes/LOAD_FAIL';

export const SAVE_NOTE = 'fibrotracker/notes/SAVE_ITEM';
export const SAVE_NOTE_SUCCESS = 'fibrotracker/notes/SAVE_ITEM_SUCCESS';
export const SAVE_NOTE_FAIL = 'fibrotracker/notes/SAVE_ITEM_FAIL';


export default function reducer(state = { food: [], meds: [], activities: [], sleep: [], pain: [], painAreas: [], generalInfo: [], appointments: [], notes: [] }, action) {
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


    case GET_PAIN:
      return { ...state, loading: true };
    case GET_PAIN_SUCCESS:
      const painScale = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, pain: painScale };
    case GET_PAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching pain entries'
      };
    case SAVE_PAIN:
        return { ...state, loading: true };
    case SAVE_PAIN_SUCCESS:
      return { ...state, loading: false, pain: [...state.pain, action.payload.data] }
    case SAVE_PAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding pain entry'
      };

    case GET_PAINAREAS:
      return { ...state, loading: true };
    case GET_PAINAREAS_SUCCESS:
      const painAreas = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, painAreas: painAreas };
    case GET_PAINAREAS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching pain area entries'
      };
    case SAVE_PAINAREAS:
        return { ...state, loading: true };
    case SAVE_PAINAREAS_SUCCESS:
      return { ...state, loading: false, painAreas: [...state.painAreas, action.payload.data] }
    case SAVE_PAINAREAS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding pain area entry'
      };


    case GET_GENERALINFO:
      return { ...state, loading: true };
    case GET_GENERALINFO_SUCCESS:
      const genInfo = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, generalInfo: genInfo };
    case GET_GENERALINFO_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching general info'
      };
    case SAVE_GENERALINFO:
        return { ...state, loading: true };
    case SAVE_GENERALINFO_SUCCESS:
      return { ...state, loading: false, generalInfo: [...state.generalInfo, action.payload.data] }
    case SAVE_GENERALINFO_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding gen info entry'
      };


    case GET_SYMPTOMS:
      return { ...state, loading: true };
    case GET_SYMPTOMS_SUCCESS:
      const symptoms = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, symptoms: symptoms };
    case GET_SYMPTOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching symptoms'
      };
    case SAVE_SYMPTOMS:
        return { ...state, loading: true };
    case SAVE_SYMPTOMS_SUCCESS:
      return { ...state, loading: false, symptoms: [...state.symptoms, action.payload.data] }
    case SAVE_SYMPTOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding symptoms entry'
      };


    case GET_APPOINTMENTS:
      return { ...state, loading: true };
    case GET_APPOINTMENTS_SUCCESS:
      const appointments = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, appointments: appointments };
    case GET_APPOINTMENTS_FAIL:
      return { 
        ...state,
        loading: false,
        error: 'Error while fetching appointment entries'
      };
    case SAVE_APPOINTMENT:
        return { ...state, loading: true };
    case SAVE_APPOINTMENT_SUCCESS:
      return { ...state, loading: false, appointments: [...state.appointments, action.payload.data] }
    case SAVE_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding appintment entry'
      };

    
    case GET_NOTES:
      return { ...state, loading: true };
    case GET_NOTES_SUCCESS:
      const notes = Object.keys(action.payload.data).map(k => ({ key: k, ...action.payload.data[k] }))
      return { ...state, loading: false, notes: notes };
    case GET_NOTES_FAIL:
      return { 
        ...state,
        loading: false,
        error: 'Error while fetching note entries'
      };
    case SAVE_NOTE:
        return { ...state, loading: true };
    case SAVE_NOTE_SUCCESS:
      return { ...state, loading: false, notes: [...state.notes, action.payload.data] }
    case SAVE_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while adding note entry'
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

  export function listPain(date) {
    return {
      type: GET_PAIN,
      payload: {
        request: {
          url: `/getPainScale`
        }
      }
    };
  }
  
  export function savePain(pain) {
    console.log('reduce', pain)
      return {
          type: SAVE_PAIN,
          payload: {
              request: {
                  url: '/addPainScale',
                  data: pain,
                  method: 'POST'
              }
          }
      }
  }

  export function listPainAreas(date) {
    return {
      type: GET_PAINAREAS,
      payload: {
        request: {
          url: `/getPainAreas`
        }
      }
    };
  }
  
  export function savePainAreas(pain) {
    // console.log('reduce', activity)
      return {
          type: SAVE_PAIN,
          payload: {
              request: {
                  url: '/addPainAreas',
                  data: pain,
                  method: 'POST'
              }
          }
      }
  }

  export function listGeneralInfo(date) {
    return {
      type: GET_GENERALINFO,
      payload: {
        request: {
          url: `/getGeneralInfo`
        }
      }
    };
  }
  
  export function saveGeneralInfo(info) {
    // console.log('reduce', activity)
      return {
          type: SAVE_GENERALINFO,
          payload: {
              request: {
                  url: '/addGeneralInfo',
                  data: info,
                  method: 'POST'
              }
          }
      }
  }


  export function listSymptoms() {
    return {
      type: GET_SYMPTOMS,
      payload: {
        request: {
          url: `/getSymptoms`
        }
      }
    };
  }
  
  export function saveSymptoms(symptoms) {
    // console.log('reduce', activity)
      return {
          type: SAVE_SYMPTOMS,
          payload: {
              request: {
                  url: '/addSymptoms',
                  data: symptoms,
                  method: 'POST'
              }
          }
      }
  }


  export function listAppointments() {
    return {
      type: GET_APPOINTMENTS,
      payload: {
        request: {
          url: `/getAppointments`
        }
      }
    };
  }
  
  export function saveAppointment(apt) {
    // console.log('reduce', activity)
      return {
          type: SAVE_APPOINTMENT,
          payload: {
              request: {
                  url: '/addAppointment',
                  data: apt,
                  method: 'POST'
              }
          }
      }
  }


  export function listNotes() {
    return {
      type: GET_NOTES,
      payload: {
        request: {
          url: `/getNotes`
        }
      }
    };
  }
  
  export function saveNote(note) {
    // console.log('reduce', activity)
      return {
          type: SAVE_NOTE,
          payload: {
              request: {
                  url: '/addNote',
                  data: note,
                  method: 'POST'
              }
          }
      }
  }