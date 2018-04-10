import {
  CHANGE_MARKER,
  CHANGE_CENTER,
  CHANGE_STEP,
  CHANGE_BASIC_FIELDS,
  CHANGE_DETAIL_RECORD
} from '../action/releaseLog'

const initialReleaseLog = {
  markers: null,
  center: null,
  step: 2,
  basicFields: {
    date: {
      value: null
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
    visiblity: {
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
    }
  },
  detailRecord: ''
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
    default:
      return state;
  }
}

export default releaseLog;