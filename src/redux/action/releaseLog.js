export const CHANGE_MARKER = 'CHANGE_MARKER';

export const CHANGE_CENTER = 'CHANGE_CENTER';

export const CHANGE_STEP = 'CHANGE_STEP';

export const CHANGE_BASIC_FIELDS = 'CHANGE_BASIC_FIELDS';

export const CHANGE_DETAIL_RECORD = 'CHANGE_DETAIL_RECORD';

export const doChangeMarker = (marker) => {
  return {
    type: CHANGE_MARKER,
    marker
  }
}

export const doChangeCenter = (center) => {
  return {
    type: CHANGE_CENTER,
    center
  }
}

export const doChangeStep = (step) => {
  return {
    type: CHANGE_STEP,
    step
  }
}

export const doChangeBasiCFields = (fieldsChanged) => {
  return {
    type: CHANGE_BASIC_FIELDS,
    fieldsChanged
  }
}

export const doChangeDetailRecord = (detailRecord) => {
  return {
    type: CHANGE_DETAIL_RECORD,
    detailRecord
  }
}
