import {
  CHANGE_MARKER,
  CHANGE_CENTER,
  CHANGE_STEP,
  CHANGE_BASIC_FIELDS,
  CHANGE_DETAIL_RECORD,
  ADD_LOG_REQUEST_POST,
  ADD_LOG_RECEIVE_SUCCESS_POST,
  ADD_LOG_RECEIVE_ERROR_POST
} from '../action/releaseLog'

const initialReleaseLog = {
  markers: null,
  center: null,
  step: 0,
  basicFields: {
    date: {
      value: null
    },
    title: {
      value: ''
    },
    timeIn: {
      value: null
    },
    timeOut: {
      value: null
    },
    location: {
      value: ''
    },
    diveSite: {
      value: ''
    },
    start: {
      value: ''
    },
    end: {
      value: ''
    },
    visibility: {
      value: ''
    },
    nitrox: {
      value: ''
    },
    airTemperature: {
      value: ''
    },
    bottomTemperature: {
      value: ''
    },
    weight: {
      value: ''
    },
    camera: {
      value: ''
    },
    isSecret: {
      value: ''
    }
  },
  detailRecord: '',
  isAddingLog: false
}

export const releaseLog = (state = initialReleaseLog, action) => {
  switch(action.type){
    case CHANGE_MARKER:
      return {...state, marker: action.marker};
    case CHANGE_CENTER:
      return {...state, center: action.center};
    case CHANGE_STEP:
      return {...state, step: action.step};
    case CHANGE_BASIC_FIELDS: 
      return {...state, basicFields: {...state.basicFields, ...action.fieldsChanged}};
    case CHANGE_DETAIL_RECORD:
      return {...state, detailRecord: action.detailRecord}
    case ADD_LOG_REQUEST_POST:
      return {...state, isAddingLog: true};
    case ADD_LOG_RECEIVE_SUCCESS_POST:
      return {...state, isAddingLog: false};
    case ADD_LOG_RECEIVE_ERROR_POST:
      return {...state, isAddingLog: false};
    default:
      return state;
  }
}

export default releaseLog;